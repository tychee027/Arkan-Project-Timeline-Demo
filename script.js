import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// ── Expected schema ───────────────────────────────────
// table "projects": id (uuid/int, pk, default), name text, color text, desc text, created_at timestamptz default now()
// table "tasks":     id (uuid/int, pk, default), pid (fk -> projects.id), name text, start date, end_date date,
//                    status text, phase text, progress int, assignee text, notes text (nullable),
//                    parent_id (fk -> tasks.id, nullable), created_at timestamptz default now()

// ── Error tracking ────────────────────────────────────
// Exposed so callers (index.html) can show the real reason a save failed,
// instead of a generic message. Read it right after an awaited call returns falsy.
export let lastError = null;
function trackError(label, error) {
  lastError = error ? { label, message: error.message || String(error), details: error } : null
  if (error) console.error(label + ':', error)
}

// ── Supabase Client ──────────────────────────────────
const supabase = createClient(
  'https://ygkfeosjkrnmsqfdcgxy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlna2Zlb3Nqa3JubXNxZmRjZ3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0OTE0MjUsImV4cCI6MjA5OTA2NzQyNX0.6jCagjgacKU9-sZ_uZ0MkUj8ldufktJFbhnuO8-qtAk'
)

// ── PROJECTS ─────────────────────────────────────────

// Get all projects
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) trackError('getProjects error', error)
  else lastError = null
  return data || []
}

// Add a new project
export async function addProject({ name, color, desc }) {
  const { data, error } = await supabase
    .from('projects')
    .insert([{ name, color, desc }])
    .select()
    .single()
  if (error) trackError('addProject error', error)
  else lastError = null
  return data
}

// Update a project
export async function updateProject(id, updates) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) trackError('updateProject error', error)
  else lastError = null
  return data
}

// Delete a project and all its tasks
export async function deleteProject(id) {
  // Delete tasks first
  await supabase.from('tasks').delete().eq('pid', id)
  // Then delete project
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) trackError('deleteProject error', error)
  else lastError = null
}

// ── TASKS ─────────────────────────────────────────────

// Get all tasks (or tasks for a specific project)
export async function getTasks(pid = null) {
  let query = supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: true })
  if (pid) query = query.eq('pid', pid)
  const { data, error } = await query
  if (error) trackError('getTasks error', error)
  else lastError = null
  return data || []
}

// Add a new task
export async function addTask({ pid, name, start, end_date, status, phase, progress, assignee, notes = null, parent_id = null }) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ pid, name, start, end_date, status, phase, progress, assignee, notes, parent_id }])
    .select()
    .single()
  if (error) trackError('addTask error', error)
  else lastError = null
  return data
}

// Update a task
export async function updateTask(id, updates) {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) trackError('updateTask error', error)
  else lastError = null
  return data
}

// Delete a task
export async function deleteTask(id) {
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) trackError('deleteTask error', error)
  else lastError = null
}

// ── LOAD ALL DATA ─────────────────────────────────────

// Load all projects and tasks at once
export async function loadAll() {
  const [projects, tasks] = await Promise.all([getProjects(), getTasks()])
  return { projects, tasks }
}

export { supabase }
