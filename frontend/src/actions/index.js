



/* 
     1类别 action
 */
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_CURRENT_CATEGORY = 'RECEIVE_CURRENT_CATEGORY'
export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
});
export const receiveCurrentCategory = category => ({
    type: RECEIVE_CURRENT_CATEGORY,
    category
})

/* export const fetchCategories = () => dispatch => (
    ReadableAPI
        .fetchCategories()
        .then(categories => dispatch(receiveCategories(categories)))
); */


/* 
    2 post action 
*/
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST_MODAL_OPEN = 'EDIT_POST_MODAL_OPEN'
export const EDIT_POST_MODAL_CLOSE = 'EDIT_POST_MODAL_CLOSE'
export const UPDATE_POST = 'UPDATE_POST'
export const DEL_POST = 'DEL_POST'
export const POST_UPDATE_TITLE = 'POST_UPDATE_TITLE'
export const POST_UPDATE_BODY = 'POST_UPDATE_BODY'
export const UPDATE_VOTE='UPDATE_VOTE'
export const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
})
export const addPost = (post) => ({
    type: ADD_POST,
    post
})
export const editPostModalOpen = () => ({
    type: EDIT_POST_MODAL_OPEN
})
export const editPostModalClose = () => ({
    type: EDIT_POST_MODAL_CLOSE
})
export const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})
export const delPost = (id) => ({
    type: DEL_POST,
    id

})
export const postUpdateTitle = (value, id) => ({
    type: POST_UPDATE_TITLE,
    value,
    id
})
export const postUpdateBody = (value, id) => ({
    type: POST_UPDATE_BODY,
    value,
    id
})
export const updateVote=(id,vote)=>({
    type:UPDATE_VOTE,
    id,
    vote
})




/* 
    3 comments action 
*/

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const COMMENT_ORDER = 'COMMENT_ORDER'
export const EDIT_MODAL_OPEN = 'EDIT_MODAL_OPEN'
export const EDIT_MODAL_CLOSE = 'EDIT_MODAL_CLOSE'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DEL_COMMENT = 'DEL_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
})
export const commentOrder = () => ({
    type: COMMENT_ORDER
})
export const editModlOpen = () => ({
    type: EDIT_MODAL_OPEN
})

export const editModalClose = () => ({
    type: EDIT_MODAL_CLOSE
})

export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})
export const delComment = (id) => ({
    type: DEL_COMMENT,
    id
})
export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})
/* 
    4 others action
*/

export const CHANGE_ORDER = 'CHANGE_ORDER'
export const GET_CURRENT_COMMENT_ID = 'GET_CURRENT_COMMENT_ID'

export const changeOrder = () => ({
    type: CHANGE_ORDER
})
export const getCurrentCommentId = (id) => ({
    type: GET_CURRENT_COMMENT_ID,
    id
})


