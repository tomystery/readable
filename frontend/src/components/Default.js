import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PostList from './PostList'
import { Icon, Button } from 'antd'
import { changeOrder,receiveCurrentCategory } from '../actions'
import AddPost from './AddPost'
class Default extends React.Component {
    render() {

        const { categories, posts, chOrder, order,categoryChange,currentCategory} = this.props

        return (
            <div className='default'>
                <ul className='clearfix default-ul'>
                    <li><Link to="/" onClick={()=>(categoryChange('all'))}  className={currentCategory==='all' ? 'active1' : ''}  >所有分类</Link></li>
                    {categories.map((category) => (
                        <li key={category.path}> <Link to={`/category/${category.path}`}  className={currentCategory=== category.path ? 'active1' : ''}  onClick={()=>(categoryChange(category.path))}>{category.name}</Link></li>
                    ))}
                </ul>


                <p className='orderBy'><span><Button type={order === "time" ? "primary" : ""} onClick={() => (chOrder())} >按Timestamp排序<Icon type="caret-up" /></Button></span>

                <span> <Button type={order === "vote" ? "primary" : ""} onClick={() => (chOrder())}>按VoteScore排序<Icon type="caret-down" /></Button></span></p>

                <PostList posts={posts} order={order} />
                <AddPost />
            </div >
        )
    }

}

function mapStateToProps(state) {
    return {
        categories: state.categoryReducer.categories,
        posts: state.postReducer.posts,
        order: state.otherReducer.order,
        currentCategory:state.categoryReducer.currentCategory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chOrder: () => dispatch(changeOrder()),
        categoryChange:(category)=>dispatch(receiveCurrentCategory(category))
    }
}

export default connect(mapStateToProps,
    mapDispatchToProps)(Default)