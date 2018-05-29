export function setActiveSubStory(subStoryId) {
  return {
    type: 'UPDATE_ACTIVE_SUB_STORY',
    payload: subStoryId
  }
}

export function setActiveOverlay(overlayName) {
  return {
    type: 'SET_ACTIVE_OVERLAY',
    payload: overlayName
  }
}
