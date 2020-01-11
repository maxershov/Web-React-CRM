const initStateRender = {page: 'TEST_PAGE'};

export default function renderPageReducer(state = initStateRender, action){
  // console.log('inSTATEfirstPAGE' + JSON.stringify(state));
  switch (action.type) {
    case 'CHANGE_PAGE':
      // console.log('ACTIONPAGE' + action)
      // console.log('ACTIONPAGE.page' + action.page);
      return {page: action.page};
    case 'PROFILE_PAGE':
        // console.log('ACTIONPAGEPROFILE' + state);
        return {page:'person'};
    default:
      return state;
  };
};

