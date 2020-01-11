const initStateRender = {page: 'MAIN_PAGE'};

export default function renderPageReducer(state = initStateRender, action){
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {page: action.page};
    case 'PROFILE_PAGE':
        return {page:'person'};
    default:
      return state;
  };
};

