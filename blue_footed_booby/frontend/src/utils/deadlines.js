// Returns true if today's date/time is after the deadline from the API.
export function isPastDeadline(deadlineString) {
  if (!deadlineString) {
    return false;
  }
  const now = new Date();
  const deadline = new Date(deadlineString);
  return now > deadline;
}
