define({
    layout: {
        menu: [
            {href: "/", icon: ".fa.fa-dashboard", title: "仪表盘"},
            {href: "#", icon: ".fa.fa-object-group", title: "组件", extend: false, subs: [
                {href: "/forms", title: "Form 表单"},
                {href: "/dropdowns", title: "Dropdown 下拉"},
                {href: "/buttons", title: "Button 按钮"},
                {href: "/icons", title: "Icon 图标"}
            ]}
        ]
    }
});