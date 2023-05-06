import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

// 创建一个 IconFont 组件
const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3128922_2xusmn6cdcc.js', // 在这里引入你的字体文件
});

type Props = {
    icon: string;
    color: string;
}

const IconComp: React.FC<Props> = ({ icon, color }) => {
    return (
       <IconFont type={icon} style={color ? {color} : undefined}/>
    )
}

export default IconComp;
