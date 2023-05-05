import {Image} from "antd";

const Logo = () => {
    return (
        <div className={'flex items-center h-100% ml-20px cursor-pointer'}>
            <Image
                width={28}
                preview={false}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg
                "
            />
            <span className={'text-#fff text-18px ml-12px'}>Vite-React-Admin</span>
        </div>
    )
}

export default Logo
