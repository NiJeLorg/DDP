export default function(state = null, action) {
  switch (action.type) {
    case 'SET_ACTIVE_OVERLAY':
      return action.payload
  }
  return state
}