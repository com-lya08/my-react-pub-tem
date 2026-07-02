import{i as e}from"./preload-helper-B45gAKPr.js";import{a as t,i as n,n as r,r as i,t as a}from"./iframe-CDTmMp1w.js";var o,s,c,l,u,d;e((()=>{r(),n(),o=i(),s={title:`Components/Modal`,tags:[`autodocs`],parameters:{layout:`centered`}},c={args:{variant:`btn-primary`,children:`Open Confirm`},render:e=>{let n=t(e=>e.openConfirm);return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(a,{variant:e.variant,onClick:()=>{n({title:`Zustand`,content:`openConfirm 모달입니다`,closeOnConfirm:!0,confirmText:`yes`,onConfirm:()=>new Promise(e=>{setTimeout(()=>{alert(`tesssst!!!`),e()},1e3)})})},children:e.children})})}},l={args:{variant:`btn-primary`,children:`Open Alert`},render:e=>{let n=t(e=>e.openAlert);return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(a,{variant:e.variant,onClick:()=>{n({title:`Zustand`,content:`알럿입니다.`})},children:e.children})})}},u={args:{variant:`btn-primary`,children:`Open Custom`},render:e=>{let n=t(e=>e.openCustom),r=t(e=>e.openAlert);return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(a,{variant:e.variant,onClick:()=>{n({title:`Zustand`,content:(0,o.jsx)(`h3`,{children:`아아아아아아ㅏ 나는 토마토입니다`}),footer:({id:e,runAction:t})=>(0,o.jsxs)(`div`,{className:`btn-wrap`,children:[(0,o.jsx)(a,{variant:`btn-line`,onClick:()=>r({title:`알림`,content:`확인되었습니다.`}),children:`테스트`}),(0,o.jsx)(a,{variant:`btn-line`,onClick:()=>{console.log(`clicked`),t(e,`onCancel`)},children:`닫기`})]})})},children:e.children})})}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "btn-primary",
    children: "Open Confirm"
  },
  render: args => {
    const openConfirm = useModalStore(s => s.openConfirm);
    return <>\r
                <Button variant={args.variant} onClick={() => {
        openConfirm({
          title: "Zustand",
          content: "openConfirm 모달입니다",
          closeOnConfirm: true,
          confirmText: "yes",
          onConfirm: () => {
            return new Promise(resolve => {
              setTimeout(() => {
                alert("tesssst!!!");
                resolve();
              }, 1000);
            });
          }
        });
      }}>\r
                    {args.children}\r
                </Button>\r
            </>;
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "btn-primary",
    children: "Open Alert"
  },
  render: args => {
    const openAlert = useModalStore(s => s.openAlert);
    return <>\r
                <Button variant={args.variant} onClick={() => {
        openAlert({
          title: "Zustand",
          content: "알럿입니다."
        });
      }}>\r
                    {args.children}\r
                </Button>\r
            </>;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "btn-primary",
    children: "Open Custom"
  },
  render: args => {
    const openCustom = useModalStore(s => s.openCustom);
    const openAlert = useModalStore(s => s.openAlert);
    return <>\r
                <Button variant={args.variant} onClick={() => {
        openCustom({
          title: "Zustand",
          content: <h3>아아아아아아ㅏ 나는 토마토입니다</h3>,
          footer: ({
            id,
            runAction
          }) => <div className="btn-wrap">\r
                                    <Button variant="btn-line" onClick={() => openAlert({
              title: "알림",
              content: "확인되었습니다."
            })}>\r
                                        테스트\r
                                    </Button>\r
                                    <Button variant="btn-line" onClick={() => {
              console.log("clicked");
              runAction(id, "onCancel");
            }}>\r
                                        닫기\r
                                    </Button>\r
                                </div>
        });
      }}>\r
                    {args.children}\r
                </Button>\r
            </>;
  }
}`,...u.parameters?.docs?.source}}},d=[`ConfirmType`,`AlertType`,`CustomType`]}))();export{l as AlertType,c as ConfirmType,u as CustomType,d as __namedExportsOrder,s as default};