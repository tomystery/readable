export function formateDate(date) {
    var d = new Date(date),
        year = d.getFullYear(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        hour = '' + d.getHours(),
        minutes = '' + d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minutes.length < 2) minutes = '0' + minutes;

    return `${year}-${month}-${day} ${hour}:${minutes}`;
}

export function formPost(post) {
    switch (true) {
        case (post.title.length === 0):
            alert('标题不能为空');
            return false;

        case (post.author.length === 0):
            alert('作者不能为空')
            return false

        case (post.body.length === 0):
            alert('内容不能为空')

        default:
            return true
    }
}

export function formComment(comment) {
    switch (true) {
        case (comment.author.length === 0):
            alert('作者不能为空');
            return false;

        case (comment.body.length === 0):
            alert('内容不能为空')
        default:
            return true
    }
}