import React from 'react'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import * as readableAPI from '../ReadableAPI'
import { formateDate } from '../util/util'
import Comments from './Comments'
import { receiveComment, editPostModalOpen, editPostModalClose, updatePost, delPost,postUpdateTitle,postUpdateBody } from '../actions'
import { Modal } from 'antd';
import AddComment from './AddComment'

class PostDetail extends React.Component {
    componentDidMount() {
        this.props.getComments(this.props.postId)
    }

    render() {

        const { postId, postList, visible, editPost, openModal, showConfirm, handleCancel, updateTitle,updateBody } = this.props

        let post = {}
    
        postList.forEach((p) => (p.id === postId ? post = p : ""))
        if (post.title === undefined) {
            return (

                <div><h3>该文章不存在</h3></div>
            )
        }
        return (

            <div className="post-detail">

                <h3>{post.title}</h3>
                <ul className='clearfix'><li>时间：{formateDate(post.timestamp)}</li><li>作者：{post.author}</li>
                    <li>评论数：{post.commentCount}</li><li>投票数:{post.voteScore}</li>
                    <li><Button onClick={() => (openModal())}><Icon type="edit" />修改</Button></li>
                    <li><Button onClick={() => (showConfirm(post.id))}><Icon type="delete" />删除</Button></li>
                </ul>
                <div className='content'>{post.body}</div>
                <p className='message'><Icon type="message" /></p>
                <p className='post-derail-h'>下面是所有的评论</p>

                <div className='post-detail-comments'>
                    <Comments />
                </div>
                <AddComment parentId={postId} />
                <div>
                    <Modal key={post.id} title="编辑帖子" visible={visible}
                        onOk={() => (editPost(post.id, post.title.trim(), post.body.trim()))} onCancel={() => (handleCancel())}>

                        <p>标题：<input type='text' value={post.title} onChange={(e) => (updateTitle(e.target.value, post.id))} /></p>
                        <p>作者：<input type='text' value={post.author} disabled /></p>
                        <p>内容： <textarea onChange={(e) => (updateBody(e.target.value, post.id))}>{post.body}</textarea></p>
                    </Modal>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {

        postList: state.postReducer.posts,
        order: state.commentReducer.commentOrder,
        visible: state.postReducer.visible
    }
}

function mapDispatchToprops(dispatch) {
    return {

        getComments: (postId) => (dispatch((dispatch, getState) => (
            readableAPI
                .getPostComment(postId)
                .then(data => dispatch(receiveComment(data)))
        ))),
        editPost: (id, title, body) => (dispatch((dispatch) => (
            readableAPI
                .editPost(id, title, body)
                .then((data) => {
                    dispatch(updatePost(data))
                    dispatch(editPostModalClose())
                })
        ))),
        handleCancel: () => { dispatch(editPostModalClose()) },
        openModal: () => { dispatch(editPostModalOpen()) },
        showConfirm: (id) => {
            dispatch((dispatch) => {
                Modal.confirm({
                    title: '您确定要删除这项内容',
                    content: '点确认1秒后关闭',
                    onOk() {
                        readableAPI
                            .delPost(id)
                            .then((data) => {
                                dispatch(delPost(data.id))
                            })
                        return new Promise((resolve) => {
                            setTimeout(resolve, 1000);
                        });
                    }
                })
            })
        },
        updateTitle: (value, id) => (dispatch(postUpdateTitle(value,id))),
        updateBody: (value,id) =>(dispatch(postUpdateBody(value,id)))
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(PostDetail)


