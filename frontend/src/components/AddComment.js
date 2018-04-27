import React from 'react'
import { connect } from 'react-redux'
import {Modal,Button,Icon} from 'antd'
import { addComment } from '../actions'
import {formComment} from '../util/util'
import * as readableAPI from '../ReadableAPI'

class AddComment extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            author: '',
            body: ''
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        const comment = {}
        comment.author = this.state.author
        comment.body = this.state.body
        comment.parentId=this.props.parentId
        if (formComment(comment)) {
            this.props.addComment(comment);
        }

        this.setState({
            visible: false
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    insertAuthor = (author) => {
        this.setState({ author })
    }

    insertBody = (body) => {
        this.setState({ body })
    }

   

    render() {
        
        return (
            <div className='add-comment'>
                <Button type="primary" onClick={this.showModal}> ADD<Icon type="plus-circle" /></Button>
                <Modal title="添加评论" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}>

                    <p>作者：<input type='text' onChange={(e) => this.insertAuthor(e.target.value)} /></p>
                    <div>正文：<textarea onChange={(e) => this.insertBody(e.target.value)}></textarea></div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToprops(dispatch) {
    return {
        addComment: (comment) => (dispatch((dispatch) => (
            readableAPI
                .addNewComment(comment)
                .then(data => dispatch(addComment(data)))
        )))
    }
}
export default connect(mapStateToProps, mapDispatchToprops)(AddComment)