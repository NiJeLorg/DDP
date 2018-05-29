export default function(state = null, action) {
  switch (action.type) {
    case 'UPDATE_ACTIVE_SUB_STORY':
      return action.payload
  }
  return state
}