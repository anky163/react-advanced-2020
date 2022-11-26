import React, { useContext } from 'react'



// =================
//     NAV-LINKS
// =================

export const NavLinksContext = React.createContext();

export const NavLinks = () => {
    const { links, setCurrentLink, setIsNavLinkHover } = useContext(NavLinksContext);
    
    const showSubmenu = (id, position) => {
        const currentLink = links.find(link => link.id === id);
        setCurrentLink({ ...currentLink, position });
    };
    
    return (
        <ul className='nav-links'>
            {
                links.map(link => {
                    const { id, title } = link;
                    return (
                        <li key={ id }>
                            <button className='link-btn' 
                                onMouseEnter={ (e) => {
                                    setIsNavLinkHover(true);
                                    const rect = e.target.getBoundingClientRect();
                                    const position = rect.x + rect.width / 2;
                                    showSubmenu(id, position);
                                } }
                                onMouseLeave={ () => setIsNavLinkHover(false) }
                                >{ title }</button>
                        </li>
                    )
                })
            }
        </ul>
    );
}




// =================
//     SUBMENU
// =================

export const SubmenuContext = React.createContext();

export const Submenu = () => {
    const { currentLink, isShowSubmenu, setIsSubMenuHover } = useContext(SubmenuContext);

    const { title, children, path, position } = currentLink;
    const numberOfChildren = children.length;
    
    return (
        <aside className={ isShowSubmenu ? 'submenu show' : 'submenu' } 
            style={ { left: position + 'px' } }
            onMouseEnter={ () => setIsSubMenuHover(true) }
            onMouseLeave={ () => setIsSubMenuHover(false) }
            >
            <section>
                <h4>{ title }</h4>

                <div className={`submenu-center col-${ numberOfChildren }`}>
                    {
                        children.map((child, index) => {
                            const childId = new Date().getTime() * index;

                            return (
                                <a key={ childId } href="/products">
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        { path }
                                    </svg>
                                    { child }
                                </a>
                            )
                        })
                    }
                </div>
            </section>
        </aside>
    );
};




// =================
//     SIDEBAR
// =================

export const SidebarContext = React.createContext();

export const Sidebar = () => {
    const { links } = useContext(SidebarContext);

    return (
        <div className='sidebar-links'>
            {
                links.map(link => {
                    const { id, title, children, path } = link;

                    return (
                        <article key={ id }>
                            <h4>{ title }</h4>

                            <div className="sidebar-sublinks">
                                {
                                    children.map((child, index) => {
                                        const childId = new Date().getTime() * index;
                                        return (
                                            <a key={ childId } href="/products">
                                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    { path }
                                                </svg>
                                                { child }
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </article>
                    )
                })
            }
        </div>
    );
};