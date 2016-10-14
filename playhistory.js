
class DopHistory extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
            let name=this.props.name;
            let address=window.location.href;
            AddCookie(address,name);
            history_show();
    }
    onmouseover() {
        $('.history-box').addClass('fade');
        $('.re-history').addClass('hover');
        $('.history-box, .re-history').off('mouseout').on('mouseout', function(){
            $('.fade').removeClass('fade');
            $('.hover').removeClass('hover')
        });
    }
    render() {
        return (
            <div className="record">
                <div className="re-history" onMouseOver={this.onmouseover.bind(this)}>历史记录</div>
                <div className="history-box" onMouseOver={this.onmouseover.bind(this)}><div className="history" id="MyOverBook" ></div></div>
            </div>
        )



    }
}


function getCookieVal (offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function getCookie (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) return getCookieVal (j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
//添加cookie
function setCookie (name, value) {
    var exp = new Date();
    exp.setTime (exp.getTime()+360000000000);
    document.cookie = name + "=" + value + "; expires=" + exp.toGMTString()+"; path=/";
}
function AddCookie(address,linkname)
{
    let wlink=linkname+"|"+address+"|"+"_&&_";
    let old_info=getCookie("videoName");
    if(old_info!==null){
        let new_info=old_info.split("_&&_");
        if(new_info.length>10){
            new_info=new_info.slice(0,10);
            old_info=new_info.join("_&&_");
        }

    }
    //取出cookie
		//转化为数组 
		//判断长度
		//>10,置空最后一个
		//转为字符串
		let insert=true;
    if(old_info==null)          //判断cookie是否为空
    {
        insert=true;
    }
    else
    {

        let old_link=old_info.split("_&&_");

        for(let j=0;j<old_link.length;j++)
        {
            if(j<=9)
            {
                if(old_link[j].indexOf(linkname)>=0)
                {
                    insert=false;
                    break;
                }
            }

        }
    }
    if(insert) //如果符合条件则重新写入数据
    {
        wlink+=old_info;
        setCookie("videoName",wlink);
        history_show();
    }

}
function history_show()
{
    let history_info=getCookie("videoName");
    let content="";
    if(history_info!=null)
    {
        let history_arg=history_info.split("_&&_");

        let i;
        for(i=0;i<history_arg.length;i++)
        {
            if(i<=9)
            {
                if(history_arg[i]!="null")
                {
                    let wlink=history_arg[i].split("|");
                    content+=("<a href='"+wlink[1]+'&from=history'+"' target='_blank'>"+"<span>"+wlink[0]+"</span></a><br>");
                }
            }
            document.getElementById("MyOverBook").innerHTML=content;
        }

    }
    else
    {
        document.getElementById("MyOverBook").innerHTML="<span>"+"亲，暂无历史记录哟~"+"</span>";
    }
}


export default DopHistory;
