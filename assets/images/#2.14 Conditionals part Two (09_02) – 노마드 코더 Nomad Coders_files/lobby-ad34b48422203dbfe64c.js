_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[35],{"/QsD":function(e,t,n){"use strict";var l=n("q1tI"),o=n.n(l),a=n("YFqc"),s=n.n(a),i=n("20a2"),r=n.n(i),u=n("vOnD"),d=n("4C6B"),c=o.a.createElement;const m=u.a.div`
  ${e=>e.clickeable?"\n    cursor:pointer;\n    &:hover {\n    .bg {\n      transform: translateY(-5px);\n    }\n    .info {\n      transform: translateY(-10px);\n    }\n    img {\n      transform: scale(1.1);\n    }\n  }":""};
`;t.a=({course:e,clickeable:t=!0})=>c(m,{onClick:()=>{if(t&&(null===e||void 0===e||!e.isComingSoon)){null!==e&&void 0!==e&&e.isEnrolled?r.a.push("/[course]/lobby",`/${null===e||void 0===e?void 0:e.slug}/lobby`):r.a.push(`/${null===e||void 0===e?void 0:e.slug}`);!0&&window.scrollTo(0,0)}},className:"flex flex-col items-center",clickeable:t&&!(null!==e&&void 0!==e&&e.isComingSoon)},c("div",{className:"overflow-hidden bg rounded-lg relative bg-white shadow-lg",style:{transition:"transform 0.2s ease-in-out"}},(null===e||void 0===e?void 0:e.level)&&c("span",{style:{position:"absolute",top:10,left:10},className:`inline-flex items-center px-3 py-0.5 z-10 rounded-full text-sm font-medium leading-5 ${"\uace0\uae09"===e.level.name?"bg-purple-100 text-purple-500":""} ${"\uc911\uae09"===e.level.name?"bg-green-100 text-green-500":""}\n            ${"\ucd08\uae09"===e.level.name?"bg-yellow-100 text-yellow-600":""} shadow`},null===e||void 0===e?void 0:e.level.name),c("img",{src:null===e||void 0===e?void 0:e.thumbnail,className:"w-full",style:{transition:"transform 0.2s ease-in-out"}})),c("div",{className:"text-center info shadow-xl flex flex-col w-11/12 justify-center  relative bg-white -top-14 rounded-lg z-0 py-5 px-2",style:{transition:"transform 0.2s ease-in-out",textOverflow:"ellipsis",maxHeight:106}},null!==e&&void 0!==e&&e.isComingSoon?c("div",{className:"px-4"},c("h3",{className:"text-xl overflow-hidden"},e?e.name:"Loading..."),c("h4",{className:"mt-2 mb-1"},"Coming Soon")):null!==e&&void 0!==e&&e.isEnrolled?t?c(s.a,{href:"/[course]/lobby",as:`/${null===e||void 0===e?void 0:e.slug}/lobby`},c("a",{className:"px-4"},c("h3",{className:"text-xl overflow-hidden mb-5 w-full",style:{textOverflow:"ellipsis",whiteSpace:"nowrap"}},null===e||void 0===e?void 0:e.name),c(d.a,{progress:(null===e||void 0===e?void 0:e.progress)||0,progressLectures:(null===e||void 0===e?void 0:e.progressLectures)||0}))):c("div",{className:"px-4"},c("h3",{className:"text-xl overflow-hidden mb-5",style:{textOverflow:"ellipsis",whiteSpace:"nowrap"}},null===e||void 0===e?void 0:e.name),c(d.a,{progress:(null===e||void 0===e?void 0:e.progress)||0,progressLectures:(null===e||void 0===e?void 0:e.progressLectures)||0})):t?c(s.a,{href:`/${null===e||void 0===e?void 0:e.slug}`},c("a",null,c("h3",{className:"text-xl overflow-hidden"},e?e.name:"Loading..."),(null===e||void 0===e?void 0:e.subtitleOne)&&c("h4",{className:"mt-2 mb-1 whitespace-nowrap"},null===e||void 0===e?void 0:e.subtitleOne),(null===e||void 0===e?void 0:e.subtitleTwo)&&c("h4",{className:"text-sm"},null===e||void 0===e?void 0:e.subtitleTwo))):c("span",null,c("h3",{className:"text-xl overflow-hidden"},e?e.name:"Loading..."),(null===e||void 0===e?void 0:e.subtitleOne)&&c("h4",{className:"mt-2 mb-1"},null===e||void 0===e?void 0:e.subtitleOne),(null===e||void 0===e?void 0:e.subtitleTwo)&&c("h4",{className:"text-sm"},null===e||void 0===e?void 0:e.subtitleTwo))))},"4C6B":function(e,t,n){"use strict";var l=n("q1tI"),o=n.n(l),a=o.a.createElement;t.a=({progress:e,progressLectures:t})=>{const n=()=>{if(0!==e&&0!==t){const n=Math.floor(e/t*100);return n>100?100:n}return 0};return a(o.a.Fragment,null,a("div",{className:"h-3 w-full bg-blue-200 rounded-full relative"},a("div",{className:"h-3 bg-blue-700 rounded-full",style:{width:`${n()}%`}})),a("span",{className:"mt-3 text-md font-medium block"},n(),"% complete"))}},Ecz6:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[course]/lobby",function(){return n("P95M")}])},H8eV:function(e,t,n){"use strict";var l=n("q1tI"),o=n.n(l),a=n("g4pe"),s=n.n(a),i=o.a.createElement;t.a=({description:e="",pageTitle:t,ogTitle:n=t,image:l="graphDefault",price:o,index:a,path:r})=>i(s.a,null,i("title",null,t),i("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),i("meta",{name:"description",content:e}),i("meta",{property:"og:title",content:n}),i("meta",{property:"og:type",content:"website"}),i("meta",{property:"og:url",content:`https://nomadcoders.co${r}`}),i("meta",{property:"og:image",content:`https://d1telmomo28umc.cloudfront.net/media/seo/${l}.jpg`}),i("meta",{property:"og:description",content:e}),i("meta",{property:"og:site_name",content:"Nomad Coders"}),i("meta",{property:"og:locale",content:"ko_KR"}),i("meta",{property:"og:image:width",content:"1200"}),i("meta",{property:"og:image:height",content:"630"}),i("meta",{property:"fb:admins",content:"2366600330252017"}),i("meta",{charSet:"utf-8"}),i("link",{rel:"canonical",href:"https://nomadcoders.co/"}),i("meta",{name:"robots",content:"index, follow"}),i("meta",{name:"twitter:title",content:n}),i("meta",{name:"twitter:description",content:e}),i("meta",{name:"twitter:image",content:l}),i("meta",{name:"naver-site-verification",content:"202966525a961e258ded0fcc0042857cea6d15f3"}))},JcIq:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var l=n("dkkg"),o=n("lTCR"),a=n.n(o),s=n("ttZb");const i=a.a`
  query courseDetail($slug: String!) {
    course(slug: $slug) {
      ...CourseCard
      name
      slug
      isEnrolled
      isFree
      isReward
      isForSale
      isComplete
      level {
        name
        color
      }
      totalPrice
      adminText
      enAdminText
      sections {
        id
        course {
          slug
        }
        order
        publicName
        lectures {
          id
          publicName
          canSee
          isCompleted
          freePreview
        }
      }
      bonuses {
        ...CourseCard
      }
    }
  }
  ${l.e}
`;t.b=e=>Object(s.c)(i,{variables:{slug:e},skip:!e})},Lw9q:function(e,t,n){"use strict";var l=n("q1tI"),o=n.n(l).a.createElement;t.a=({children:e})=>o("div",{className:"mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8"},e)},P95M:function(e,t,n){"use strict";n.r(t);var l=n("q1tI"),o=n.n(l),a=n("Ue4y"),s=n("JcIq"),i=n("20a2"),r=n.n(i),u=n("Lw9q"),d=n("/QsD"),c=n("Po2v"),m=n("H8eV"),p=o.a.createElement;t.default=()=>{var e,t,n,o,g,v,f,b;const w=Object(i.useRouter)(),h=null!==w&&void 0!==w&&null!==(e=w.query)&&void 0!==e&&e.course?null===w||void 0===w||null===(t=w.query)||void 0===t||null===(n=t.course)||void 0===n?void 0:n.toString():"",{data:x}=Object(s.b)(h);return Object(l.useEffect)((()=>{null!==x&&void 0!==x&&x.course&&(x.course.isEnrolled||r.a.push(`/${x.course.slug}`))}),[x]),p(a.a,null,p(m.a,{index:!1,pageTitle:`${null!==x&&void 0!==x&&null!==(o=x.course)&&void 0!==o&&o.name?x.course.name:"Watch Now"} \u2013 \ub178\ub9c8\ub4dc \ucf54\ub354 Nomad Coders`,ogTitle:`${null!==x&&void 0!==x&&null!==(g=x.course)&&void 0!==g&&g.name?x.course.name:"Watch Now"} \u2013 \ub178\ub9c8\ub4dc \ucf54\ub354 Nomad Coders`,description:(null===x||void 0===x||null===(v=x.course)||void 0===v?void 0:v.subtitleOne)||"",path:`/${h}/lobby`,image:"wetube"===h?"wetube-course":h}),p("div",{className:"bg-gray-50 py-20"},p(u.a,null,p("div",{className:"grid grid-cols-1 gap-y-10 lg:gap-x-14 lg:grid-cols-3"},p("div",null,p(d.a,{course:null===x||void 0===x?void 0:x.course,clickeable:!1})),p("div",{className:"col-span-2 "},p(c.a,{full:!0,sections:null===x||void 0===x||null===(f=x.course)||void 0===f?void 0:f.sections,isEnrolled:(null===x||void 0===x||null===(b=x.course)||void 0===b?void 0:b.isEnrolled)||!1}))))))}},Po2v:function(e,t,n){"use strict";var l=n("q1tI"),o=n.n(l),a=n("YFqc"),s=n.n(a),i=n("20a2"),r=n.n(i),u=o.a.createElement;const d=({section:e,isEnrolled:t,lectureView:n,nowWatching:o,toggleSidebar:a})=>{const i=Object(l.createRef)();return Object(l.useEffect)((()=>{i.current&&i.current.focus()}),[o]),u("div",{className:"flex flex-col mb-10 w-full"},u("div",{className:"-my-2 py-2 overflow-x-auto sm:-mx-6 px-1 sm:px-6 lg:-mx-8 lg:px-8"},u("div",{className:"align-middle inline-block  w-full shadow overflow-hidden rounded-md sm:rounded-lg border-b border-gray-200"},u("span",{className:"px-6 py-3 block min-w-full border-b border-gray-200 bg-white text-left text-sm leading-4 font-medium text-gray-800 uppercase tracking-wider"},e.publicName),u("div",{className:"min-w-full"},u("div",null,e.lectures&&e.lectures.map(((l,d)=>l&&u("button",{ref:o===l.id?i:null,onClick:t||l.freePreview?()=>{return t=l.id,a&&a(),void r.a.push("/[course]/lectures/[id]",`/${e.course.slug}/lectures/${t}`);var t}:()=>null,key:l.id,className:` focus:outline-none ${t||l.freePreview?"cursor-pointer focus:ring  focus:ring-blue-400  focus:outline-none":"cursor-not-allowed"} w-full  h-full flex justify-between ${o===l.id?"bg-blue-500 shadow-md block":l.isCompleted?"bg-gray-100":d%2!==0?"bg-white":"bg-gray-50"}`},u("span",{className:`px-6 py-4 whitespace-nowrap text-sm leading-5 overflow-hidden font-medium flex items-center ${o===l.id?"text-white":l.isCompleted?"text-gray-400":t||l.freePreview?"text-gray-900":"text-gray-400"}  `},l.publicName," ",!t&&!l.freePreview&&u("svg",{viewBox:"0 0 20 20",fill:"currentColor",className:"lock-closed w-4 h-4 ml-2"},u("path",{fillRule:"evenodd",d:"M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",clipRule:"evenodd"})),(l.isCompleted||o===l.id)&&u("svg",{fill:"currentColor",viewBox:"0 0 20 20",className:"ml-2 w-5 h-5 "+(o===l.id?"text-white":"")},u("path",{d:""+(o!==l.id?"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z":"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"),clipRule:"evenodd",fillRule:"evenodd"}))),!n&&u("span",{className:"px-6 py-4 hidden md:block  whitespace-nowrap text-right text-sm leading-5 font-medium"},t||l.freePreview?u(s.a,{href:"/[course]/lectures/[id]",as:`/${e.course.slug}/lectures/${l.id}`},u("a",{className:"hover:text-blue-900 "+(l.isCompleted?"text-gray-400":"text-blue-600")},t?"Watch now":"Free Preview"," ","\u2192")):u("span",{className:"cursor-not-allowed opacity-25"},"Watch now \u2192"))))))))))};t.a=({sections:e,isEnrolled:t=!1,full:n=!1,lectureView:a=!1,nowWatching:s,maxSections:i=2,toggleSidebar:r})=>{const{0:c,1:m}=Object(l.useState)(n),p=()=>m(!0);return e?u("div",{className:"flex flex-col items-center w-full"},e.map(((e,n)=>e.order<=i||c?u(d,{nowWatching:s,lectureView:a,section:e,key:n,isEnrolled:t,toggleSidebar:r}):null)),e.length>=2&&!c&&e.length!==i&&u("span",{className:"inline-flex mx-auto rounded-md shadow-sm"},u("button",{onClick:p,type:"button",className:"inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring  focus:ring-blue-400  active:bg-blue-700 transition ease-in-out duration-150"},u("svg",{fill:"currentColor",viewBox:"0 0 20 20",className:"-ml-1 mr-2 h-5 w-5"},u("path",{fillRule:"evenodd",d:"M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z",clipRule:"evenodd"})),"See all (",e.length,") sections"))):u(o.a.Fragment,null,[...new Array(5)].map(((e,t)=>u("div",{className:"w-full rounded shadow bg-white p-16 mb-10",key:t}))))}},dkkg:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"f",(function(){return r})),n.d(t,"b",(function(){return u})),n.d(t,"h",(function(){return d})),n.d(t,"d",(function(){return c})),n.d(t,"g",(function(){return m})),n.d(t,"a",(function(){return p})),n.d(t,"j",(function(){return g})),n.d(t,"i",(function(){return v}));var l=n("lTCR"),o=n.n(l);const a=o.a`
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
`,s=o.a`
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
`,i=o.a`
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
  ${s}
`,r=o.a`
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
`,u=o.a`
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
`,d=o.a`
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
`,c=o.a`
  fragment CouponParts on CouponType {
    created
    discountAmount
    used
    id
    isExpired
    expirationDate
  }
`,m=o.a`
  fragment NoteParts on NoteType {
    id
    content
    minutes
    seconds
    created
  }
`,p=o.a`
  fragment CategoryParts on CategoryType {
    name
    id
    slug
    isPublic
    tagline
    totalThreads
  }
`,g=o.a`
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
`,v=o.a`
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
`}},[["Ecz6",2,1,5,0,3,4,6,7]]]);