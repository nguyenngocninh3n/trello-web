// export const SERVER_ADDRESS = 'http://localhost:5000'
const SERVER_ADDRESS_LIST = {
  dev: 'http://localhost:5001',
  production: 'https://trello-server-srvo.onrender.com'
}
export const SERVER_ADDRESS = SERVER_ADDRESS_LIST[process.env.BUILD_MODE]

export const CARD_ACTIONS = {
  ADD_MEMBER: 'ADD_MEMBER',
  DELETE_MEMBER: 'DELETE_MEMBER'
}
