import './App.scss'
import avatar from './images/bozai.png'
import {useEffect, useState} from "react";
import Comment from './Comment';


// Comment List data
let defaultList = [
    {
        // comment id
        rpid: 3,
        // user info
        user: {
            uid: '13258165',
            avatar: '',
            uname: 'Jay Zhou',
        },
        // comment content
        content: 'Nice, well done',
        // created datetime
        ctime: '10-18 08:15',
        like: 88,
    },
    {
        rpid: 2,
        user: {
            uid: '36080105',
            avatar: '',
            uname: 'Song Xu',
        },
        content: 'I search for you thousands of times, from dawn till dusk.',
        ctime: '11-13 11:29',
        like: 88,
    },
    {
        rpid: 1,
        user: {
            uid: '30009257',
            avatar: '',
            uname: 'John',
        },
        content: 'I told my computer I needed a break... now it will not stop sending me vacation ads.',
        ctime: '10-19 09:00',
        like: 66,
    },
]
// current logged in user info
const user = {
    // userid
    uid: '30009257',
    // profile
    avatar,
    // username
    uname: 'John',
}

// Nav Tab
const tabs = [
    {type: 'hot', text: 'Top'},
    {type: 'newest', text: 'Newest'},
]

const App = () => {

    const [list, setList] = useState([...defaultList]);
    const [activeTab, setActiveTab] = useState('')
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:4000/comments');
                if (response.ok) {
                    const data = await response.json();
                    setList(data);

                }
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        fetchComments();
    }, []);


    const handleClick = (e: string) => {

        if (e === 'newest') {
            const sortedNewest = [...list].sort((a, b) => b.ctime.localeCompare(a.ctime))
            setList(sortedNewest);
        } else {
            const sortedNewest = [...list].sort((a, b) => b.like - a.like)
            setList(sortedNewest);
        }
        setActiveTab(e)
    }

    const handlePost = () => {
        if (newComment.trim() === '')
            return
        const newCommentItem = {
            rpid: list.length + 1,
            user: {...user},
            content: newComment.trim(),
            ctime: new Date().toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
            like: 0,
        }
        setList([newCommentItem, ...list]);
        setNewComment('');
    }

    // const handlePostStateless = (comment: string) => {
    //     if (comment.trim() === '')
    //         return
    //     const newCommentItem = {
    //         rpid: list.length + 1,
    //         user: {...user},
    //         content: comment.trim(),
    //         ctime: new Date().toLocaleString('en-US', {
    //             month: '2-digit',
    //             day: '2-digit',
    //             hour: '2-digit',
    //             minute: '2-digit'
    //         }),
    //         like:0,
    //     }
    //     setList([newCommentItem, ...list]);
    // }


    return (
        <div className="app">
            {/* Nav Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">Comments</span>
                        {/* Like */}
                        <span className="total-reply">{list.length}</span>
                    </li>
                    <li className="nav-sort">
                        {/* highlight class name： active */}
                        <a onClick={() => handleClick("top")}
                           style={{fontWeight: activeTab === 'top' ? 'bold' : "initial"}} className='nav-item'>Top</a>
                        <a onClick={() => handleClick("newest")}
                           style={{fontWeight: activeTab === 'newest' ? 'bold' : "initial"}}
                           className='nav-item'>Newest</a>
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* comments */}
                <div className="box-normal">
                    {/* current logged in user profile */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="Profile"/>
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* comment */}
                        <textarea
                            className="reply-box-textarea"
                            placeholder="tell something..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        {/* post button */}
                        <div className="reply-box-send">
                            <div className="send-text" onClick={handlePost}>post</div>
                        </div>
                    </div>
                </div>
                {/* comment list */}
                <div className="reply-list">
                    {/* comment item */}
                    {list.map((item, i) => <Comment avatar={item.user.avatar} uname={item.user.uname} content={item.content}
                                                    like={item.like} key={i} ctime={item.ctime}/>)}
                </div>
            </div>
        </div>
    )
}

export default App