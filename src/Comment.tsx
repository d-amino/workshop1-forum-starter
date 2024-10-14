type PropsType = {
    avatar: string,
    uname: string,
    content: string,
    like: number,
    ctime: string
}

export default function Comment(props: PropsType) {
    return <div className="reply-item">
        {/* profile */}
        <div className="root-reply-avatar">
            <div className="bili-avatar">
                <img
                    className="bili-avatar-img"
                    alt={props.avatar}
                />
            </div>
        </div>

        <div className="content-wrap">
            {/* username */}
            <div className="user-info">
                <div className="user-name">{props.uname}</div>
            </div>
            {/* comment content */}
            <div className="root-reply">
                <span className="reply-content">{props.content}</span>
                <div className="reply-info">
                    {/* comment created time */}
                    <span className="reply-time">{props.ctime}</span>
                    {/* total likes */}
                    <span className="reply-time">Like(s):{props.like}</span>
                    <span className="delete-btn">
                    Delete
                  </span>
                </div>
            </div>
        </div>
    </div>
}