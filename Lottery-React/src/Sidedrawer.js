
const SideDrawer = ({ toggle }) => {
    return (
        <div 
            style={
                { 
                    position: 'absolute',
                    top: '0', left: '0',
                    backgroundColor: 'rgba(0,0,0,0.26)', 
                    width: '100vw', 
                    height: '100vh',
                    zIndex: '5'
                }
            }
            onClick={toggle}
        >

        </div>
    )
}

export default SideDrawer