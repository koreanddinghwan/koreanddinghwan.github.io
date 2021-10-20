(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[21],{"2AkR":function(e,t,a){"use strict";a.d(t,"a",(function(){return v}));var r=a("q1tI"),n=a.n(r),o=a("xyvv"),l=a("wHSu"),s=a("LdPX"),i=a.n(s),d=a("IP2g"),u=a("3U7G"),m=a("MQup"),c=a("YFqc"),p=a.n(c),f=a("lTCR"),g=a.n(f),y=a("ttZb"),h=n.a.createElement;const b=g.a`
  mutation deleteThread($threadPk: Int!) {
    deleteThreadOrReply(threadPk: $threadPk) {
      ok
    }
  }
`,v=({thread:e,fullView:t=!1})=>{var a,r;const[s,{loading:c}]=Object(y.b)(b,{variables:{threadPk:+e.id},update:(t,a)=>{var r,n;null!==(r=a.data)&&void 0!==r&&null!==(n=r.deleteThreadOrReply)&&void 0!==n&&n.ok&&t.writeFragment({id:`ThreadType:${e.id}`,fragment:g.a`
          fragment EditFragment on ThreadType {
            user {
              avatar
              username
              tier
            }
            payload
            title
          }
        `,data:{__typename:"ThreadType",user:{__typename:"UserType",avatar:null,tier:null,username:"[deleted]"},payload:"[deleted]",title:"[deleted]"}})}});return h("div",{className:`${e.isPinned?"bg-yellow-50":"bg-white"} shadow-lg px-2 md:px-5 p-5 pl-3 rounded-md mb-3 ${c?"bg-red-300":""}`},h("div",{className:" flex items-center justify-between"},h("div",{className:"mr-2 md:mr-5"},h(m.a,{threadId:+e.id,isUpvoted:e.isUpvoted,totalVotes:e.totalVotes})),h("div",{className:"w-full"},t?h("span",{className:"text-lg md:text-xl flex  leading-6 font-semibold text-cool-gray-900"},e.title,e.isPinned?h("span",{className:"text-sm  hidden md:block ml-2 text-green-400  "},h(d.a,{icon:l.l,size:"xs"}),h("span",{className:"text-xs ml-0.5"},"Pinned")):""):h(p.a,{href:"/community/thread/[id]/",as:`/community/thread/${e.id}`},h("a",{className:" text-lg md:text-xl flex leading-6 font-semibold text-cool-gray-900"},e.title,e.isPinned?h("span",{className:"text-sm ml-2  hidden md:block text-green-400  "},h(d.a,{icon:l.l,size:"xs"}),h("span",{className:"text-xs ml-0.5"},"Pinned")):"")),h("div",{className:"text-sm mt-1.5 flex flex-wrap items-center text-cool-gray-600 font-light"},null!==(a=e.category)&&void 0!==a&&a.name?h("div",{className:"mr-1"},"in"," ",h(p.a,{href:"/community/[category]",as:`/community/${e.category.slug}`},h("a",{className:"font-semibold bg-cool-gray-500 text-white px-1 pb-0.5 rounded-sm "},"#",null===(r=e.category)||void 0===r?void 0:r.name))):"",h("div",{className:"mr-3 md:mr-0"},"by"," ",h(p.a,{href:"/users/[username]",as:`/users/${e.user.username}`},h("a",{className:"font-semibold"},e.user.username))),h("span",{className:"hidden md:block mx-1.5"},"\u2022"),h("div",null,o.a(e.created)),e.totalReplies&&e.totalReplies>0?t?null:h(n.a.Fragment,null,h("span",{className:"mx-1.5"},"\u2022"),h("div",{className:"flex items-center"},h("span",{className:"mr-2"},"\ud83d\udcac"),h("span",{className:"font-medium  text-base"},e.totalReplies))):null,null)),h("div",{className:"flex flex-col items-center"},h(u.a,{hasLink:!0,xl:!1,url:e.user.avatar,tier:e.user.tier,username:e.user.username,className:" hidden md:block md:w-14 md:ml-0 "}),t&&"[deleted]"!==e.user.username&&e.isOwner?h("div",{className:"mt-5 flex"},h("button",{onClick:()=>{if(!c){confirm("You are about to delete this post. Continue?")&&s()}},className:"flex mr-4 items-center bg-red-500 p-1 rounded-sm text-xs  text-white font-medium"},h("svg",{fill:"currentColor",viewBox:"0 0 20 20",className:"w-4 h-4 mr-1"},h("path",{d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd",fillRule:"evenodd"})),"Delete"),h(p.a,{href:"/community/thread/[id]/edit",as:`/community/thread/${e.id}/edit`},h("a",{className:"flex items-center bg-yellow-300 p-1 rounded-sm text-xs  text-white font-medium"},h("svg",{fill:"currentColor",viewBox:"0 0 20 20",className:"w-4 mr-1 h-4"},h("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})),"Edit"))):null)),t&&null!==e&&void 0!==e&&e.payload?h("div",{className:"md:ml-16 mt-5 "},h("div",{className:"md break-words community-post"},h(i.a,{html:null===e||void 0===e?void 0:e.payload.replace(/\s((http|https):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,'<a class="text-blue-500 underline" href="$1" target="_blank"rel="noopener nofollow noreferrer"\n                >$1</a>'),disallowedTagsMode:"escape",allowedTags:["h1","h2","h3","h4","h5","h6","blockquote","div","figcaption","figure","hr","li","ol","p","pre","ul","a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","s","samp","small","span","strong","sub","sup","time","u","var","wbr","caption","img"]}))):null)}},"3U7G":function(e,t,a){"use strict";var r=a("q1tI"),n=a.n(r),o=n.a.createElement;const l=({hasLink:e,children:t,username:a})=>e?o("a",{href:`/users/${a}`,target:"_blank"},t):o(n.a.Fragment,null,t);t.a=({url:e,className:t="w-16",tier:a,username:r="",xl:n,hasLink:s})=>o(l,{hasLink:s,username:r},o("div",{className:`${t} relative`},e?o("img",{src:e,className:"w-full rounded-full"}):o("div",{className:"w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-gray-100 "},o("svg",{className:"w-full h-full text-gray-300",fill:"currentColor",viewBox:"0 0 24 24"},o("path",{d:"M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"}))),a&&"[deleted]"!==r&&o("img",{src:`/badges/shield_${a}.svg`,className:`absolute ${n?"right-0 w-3/12 bottom-0":" w-6 -mt-6 right-0"} `})))},H8eV:function(e,t,a){"use strict";var r=a("q1tI"),n=a.n(r),o=a("g4pe"),l=a.n(o),s=n.a.createElement;t.a=({description:e="",pageTitle:t,ogTitle:a=t,image:r="graphDefault",price:n,index:o,path:i})=>s(l.a,null,s("title",null,t),s("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),s("meta",{name:"description",content:e}),s("meta",{property:"og:title",content:a}),s("meta",{property:"og:type",content:"website"}),s("meta",{property:"og:url",content:`https://nomadcoders.co${i}`}),s("meta",{property:"og:image",content:`https://d1telmomo28umc.cloudfront.net/media/seo/${r}.jpg`}),s("meta",{property:"og:description",content:e}),s("meta",{property:"og:site_name",content:"Nomad Coders"}),s("meta",{property:"og:locale",content:"ko_KR"}),s("meta",{property:"og:image:width",content:"1200"}),s("meta",{property:"og:image:height",content:"630"}),s("meta",{property:"fb:admins",content:"2366600330252017"}),s("meta",{charSet:"utf-8"}),s("link",{rel:"canonical",href:"https://nomadcoders.co/"}),s("meta",{name:"robots",content:"index, follow"}),s("meta",{name:"twitter:title",content:a}),s("meta",{name:"twitter:description",content:e}),s("meta",{name:"twitter:image",content:r}),s("meta",{name:"naver-site-verification",content:"202966525a961e258ded0fcc0042857cea6d15f3"}))},LdPX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),n=s(a("q1tI")),o=s(a("17x9")),l=s(a("BO/R"));function s(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var u=["allowProtocolRelative","allowedAttributes","allowedClasses","allowedSchemes","allowedSchemesByTag","allowedTags","exclusiveFilter","nonTextTags","parser","selfClosing","transformTags"],m=function(e){function t(){return i(this,t),d(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this,t=u.reduce((function(t,a){var r=e.props[a];return"undefined"!==typeof r&&(t[a]=r),t}),{}),a=(0,l.default)(this.props.html,t);return n.default.createElement("div",{className:this.props.className,dangerouslySetInnerHTML:{__html:a},id:this.props.id,style:this.props.style})}}]),t}(n.default.Component);t.default=m,m.defaultProps={html:""},m.propTypes={allowProtocolRelative:o.default.bool,allowedAttributes:o.default.objectOf(o.default.arrayOf(o.default.string)),allowedClasses:o.default.objectOf(o.default.arrayOf(o.default.string)),allowedSchemes:o.default.arrayOf(o.default.string),allowedSchemesByTag:o.default.objectOf(o.default.arrayOf(o.default.string)),allowedTags:o.default.arrayOf(o.default.string),exclusiveFilter:o.default.func,html:o.default.string.isRequired,nonTextTags:o.default.arrayOf(o.default.string),parser:o.default.any,selfClosing:o.default.arrayOf(o.default.string),transformTags:o.default.objectOf(o.default.oneOf([o.default.func,o.default.string])),className:o.default.string,id:o.default.string,style:o.default.any}},Lw9q:function(e,t,a){"use strict";var r=a("q1tI"),n=a.n(r).a.createElement;t.a=({children:e})=>n("div",{className:"mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"},e)},MQup:function(e,t,a){"use strict";a.d(t,"a",(function(){return h}));var r=a("rePB"),n=a("q1tI"),o=a.n(n),l=a("ttZb"),s=a("wHSu"),i=a("IP2g"),d=a("lTCR"),u=a.n(d),m=a("20a2"),c=a("Py3f"),p=o.a.createElement;function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}const y=u.a`
  mutation toggleForumUpvote($replyPk: Int, $threadPk: Int) {
    toggleForumUpvote(replyPk: $replyPk, threadPk: $threadPk) {
      ok
    }
  }
`,h=({threadId:e,replyId:t,isUpvoted:a,totalVotes:r})=>{const{data:n}=Object(c.a)(),[o,{loading:d}]=Object(l.b)(y,{variables:g(g({},t&&{replyPk:t}),e&&{threadPk:e}),update:(n,o)=>{var l,s;null!==(l=o.data)&&void 0!==l&&null!==(s=l.toggleForumUpvote)&&void 0!==s&&s.ok&&(e?n.writeFragment({id:`ThreadType:${e}`,fragment:u.a`
            fragment UpvotedThread on ThreadType {
              isUpvoted
              totalVotes
            }
          `,data:{__typename:"ThreadType",isUpvoted:!a,totalVotes:a?Math.max(r-1,0):r+1}}):t&&n.writeFragment({id:`ReplyType:${t}`,fragment:u.a`
            fragment UpvotedReply on ReplyType {
              isUpvoted
              totalVotes
            }
          `,data:{__typename:"ReplyType",isUpvoted:!a,totalVotes:a?Math.max(r-1,0):r+1}}))}}),f=Object(m.useRouter)();return p("button",{onClick:()=>{if(null===n||void 0===n||!n.me)return alert("\ub85c\uadf8\uc778 \ud558\uc2dc\uba74 \ucd94\ucc9c\ud560 \uc218 \uc788\uc5b4\uc694!"),f.push("/join");d||o()},className:" px-3 border-2 rounded-md flex flex-col items-center "+(a?"text-green-500 border-green-500":"text-cool-gray-700 border-gray-300")},p(i.a,{icon:s.a,size:"lg",className:a?"":"opacity-50"}),p("span",{className:"-mt-1 font-medium"},r))}},dkkg:function(e,t,a){"use strict";a.d(t,"e",(function(){return o})),a.d(t,"c",(function(){return s})),a.d(t,"f",(function(){return i})),a.d(t,"b",(function(){return d})),a.d(t,"h",(function(){return u})),a.d(t,"d",(function(){return m})),a.d(t,"g",(function(){return c})),a.d(t,"a",(function(){return p})),a.d(t,"j",(function(){return f})),a.d(t,"i",(function(){return g}));var r=a("lTCR"),n=a.n(r);const o=n.a`
  fragment CourseCard on CourseType {
    name
    progress
    progressLectures
    isEnrolled
    isFree
    isReward
    isComingSoon
    slug
    thumbnail
    subtitleOne
    subtitleTwo
    promptChallenge
    level {
      name
      color
    }
    badges {
      id
    }
  }
`,l=n.a`
  fragment CommentReplyParts on CommentType {
    id
    user {
      username
      avatar
      amazing
      tier
    }
    content
    isOwner
    created
  }
`,s=n.a`
  fragment CommentParts on CommentType {
    id
    user {
      username
      avatar
      amazing
      tier
    }
    parent {
      id
    }
    isUpvoted
    upvotes
    content
    isOwner
    created
    replies {
      ...CommentReplyParts
    }
  }
  ${l}
`,i=n.a`
  fragment IssueCommentParts on IssueCommentType {
    id
    comment
    isSolution
    isOwner
    created
    user {
      username
      avatar
      tier
      amazing
    }
  }
`,d=n.a`
  fragment ChallengeCard on ChallengeType {
    name
    slug
    batch
    duration
    inProgress
    comingSoon
    finished
    canEnroll
    startDate
    isEnrolled
    isWaiting
    isCompleted
    isOnReview
    challengersNumber
    waitingNumber
    assignmentsNumber
    currentDay
    inBufferZone
    nextStartDate
    course {
      name
      subtitleOne
      slug
      thumbnail
      progressLectures
      isEnrolled
      promptChallenge
    }
    unlocks {
      image
    }
  }
`,u=n.a`
  fragment ReportParts on ReportType {
    assignments {
      number
    }
    progressList {
      user {
        username
      }
      submissions {
        url
        quizResponse {
          totalScore
        }
      }
    }
  }
`,m=n.a`
  fragment CouponParts on CouponType {
    created
    discountAmount
    used
    id
    isExpired
    expirationDate
  }
`,c=n.a`
  fragment NoteParts on NoteType {
    id
    content
    minutes
    seconds
    created
  }
`,p=n.a`
  fragment CategoryParts on CategoryType {
    name
    id
    slug
    isPublic
    tagline
    totalThreads
  }
`,f=n.a`
  fragment ThreadParts on ThreadType {
    id
    user {
      username
      avatar
      tier
      amazing
    }
    category {
      name
      slug
    }
    title
    isPinned
    totalVotes
    totalReplies
    isOwner
    isUpvoted
    created
    views
    showing
  }
`,g=n.a`
  fragment ReplyParts on ReplyType {
    id
    user {
      username
      avatar
      tier
    }
    payload
    isPinned
    totalVotes
    isOwner
    isUpvoted
    created
    totalReplies
    replies {
      user {
        username
        avatar
      }
      id
      created
      isOwner
      payload
    }
  }
`},rePB:function(e,t,a){"use strict";function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return r}))}}]);