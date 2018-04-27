import React from 'react'
import { connect } from 'react-redux'
import { formateDate } from '../util/util'
import { Modal, Button ,Icon} from 'antd'

import { getCurrentCommentId,commentOrder, editModlOpen, editModalClose, updateComment,delComment } from '../actions'
import * as ReadableAPI from '../ReadableAPI'

class Comments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            body: ''
        }
    }

    updateBody = (body) => {
        this.setState({ body })
    }


   


    render() {

        const { commentsList, chOrder,order, commentOrder, getCommentId, currentCommentId, handleCancel, visible, editComments,showConfirm } = this.props

        const { body } = this.state
       
        if (commentOrder === 'time') {
            commentsList.sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
        } else {
            //sort by vote
            commentsList.sort((a, b) => (a.voteScore < b.voteScore));
        }
      
        let editComment = {}
        commentsList.forEach((comment) => (comment.id === currentCommentId ? editComment = comment : ''))
      
        return (
            <div className='comment'>
            {commentsList.length === 0 ? "没有评论" : (<p className='orderBy'>
            <span><Button type={order === "time" ? "primary" : ""} onClick={() => (chOrder())} >按Timestamp排序<Icon type="caret-up" /></Button></span>
            <span> <Button type={order === "vote" ? "primary" : ""} onClick={() => (chOrder())}>按VoteScore排序<Icon type="caret-down" /></Button></span></p>)}


                <ul>
                    {commentsList.map((comment) => (
                        <li className='clearfix' key={comment.id}>
                            <div className='comment-left'>
                                <h3>作者：{comment.author}</h3>
                                <p className='comment-time'>时间：{formateDate(comment.timestamp)}</p>
                                <p>正文：{comment.body}</p>
                                <p>投票数：{comment.voteScore}</p>
                            </div>
                            <div className='comment-right'>
                                <Button type="primary" onClick={() => (getCommentId(comment.id))} >修改</Button>
                                <Button onClick={()=>(showConfirm(comment.id))}> 删除</Button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <Modal key={editComment.id} title="编辑评论" visible={visible}
                        onOk={() => (editComments(editComment.id, Date.now(), body.trim()))} onCancel={() => (handleCancel())}>


                        <p>作者：<input type='text' value={editComment.author} disabled /></p>
                        <p>内容： <textarea onChange={(e) => this.updateBody(e.target.value)}>{editComment.body}</textarea></p>
                    </Modal>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ commentReducer, otherReducer }) {
    return {
        commentsList: commentReducer.comments,
        commentOrder: commentReducer.commentOrder,
        currentCommentId: otherReducer.currentCommentId,
        visible: commentReducer.visible,
        order: commentReducer.commentOrder,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        chOrder: () => (dispatch(commentOrder())),
        getCommentId: (id) => {
            dispatch(getCurrentCommentId(id))
            dispatch(editModlOpen())

        },
        handleCancel: () => { dispatch(editModalClose()) },
        editComments: (id, timestamp, body) => (dispatch((dispatch) => (

            ReadableAPI
                .editComment(id, timestamp, body)
                .then((data) => {
                    dispatch(updateComment(data))
                    dispatch(editModalClose())
                })

        ))),
        showConfirm:(id)=>{dispatch((dispatch)=>{
            Modal.confirm({
                title: '您是否确认要删除这项内容',
                content: '点确认 1 秒后关闭',
                onOk() {
                    ReadableAPI
                    .delComment(id)
                    .then((data)=>{
                       
                            dispatch(delComment(data.id))
                        }
                    )
                    return new Promise((resolve) => {
                        setTimeout(resolve, 1000);
                    });
                },
                onCancel() { },
            })
        })}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)