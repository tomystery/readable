import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Icon } from 'antd'
import { addPost } from '../actions'
import { formPost } from '../util/util'
import * as readableAPI from '../ReadableAPI'

class AddPost extends React.Component {

    constructor() {
        super()
        this.state = {
            visible: false,
            body: '',
            author: '',
            title: '',
            category: ''

        }
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        const post = {}
        post.title = this.state.title
        post.author = this.state.author
        post.body = this.state.body
        post.category = this.state.category
        console.log(post)
        if (formPost(post)) {
            this.props.addPosts(post);
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
    changeTitle = (title) => {
        this.setState({
            title
        })
    }
    changeAuthor = (author) => {
        this.setState({ author })
    }
    changeBody = (body) => {
        this.setState({ body })
    }
    changeCategory = (category) => {
        this.setState({ category })
    }

    render() {
        const { categories, title, author, body, category } = this.props

        return (
            <div className='add-post'>
                <Button type="primary" onClick={this.showModal}> ADD<Icon type="plus-circle" /></Button>
                <Modal title="添加post" visible={this.state.visible}
                    onOk={this.handleOk} onCancel={this.handleCancel}
                >
                    <p>标题：<input type='text' onChange={(e) => this.changeTitle(e.target.value)} /></p>
                    <p>作者：<input type='text' onChange={(e) => this.changeAuthor(e.target.value)} /></p>
                    <div>正文：<textarea onChange={(e) => this.changeBody(e.target.value)}></textarea></div>
                    <p>分类：
                        <select onChange={(e) => this.changeCategory(e.target.value)}>
                            {categories.map((category) => (
                                <option key={category.path}>{category.name}</option>
                            ))}

                        </select></p>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories
    }

}
function mapDispatchToProps(dispatch) {
    return {
        addPosts: (post) => (dispatch((dispatch, getState) => (
            readableAPI
                .addNewPost(post)
                .then(data => dispatch(addPost(data)))
        )))
    }
}

export default connect(mapStateToProps,
    mapDispatchToProps)(AddPost);