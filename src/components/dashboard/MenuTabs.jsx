import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



export default function MenuTabs(props) {
  const PC_TOP = 94;
  const MOBILE_TOP = 38;
  
  const { tabMenu } = props;
  const [ stateSelected, setStateSelected ] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const refMenus = useRef([]);
  const refContainer = useRef();
  const refBar = useRef();
  

  //==============================================================================
  // function
  //==============================================================================

  /**
     참조된 element의 위치 크기 변화 감지 listener
  * @version 1.0.0
  * @author 2hyunkook
  */
  const resizeObserver = new ResizeObserver((entries) => {
    setPosition(  refMenus.current[entries[0].target.getAttribute('data-index')]  );
  });

  const isMenuPath = (path, menuPath) => {
    const regex = /(\/\d+|\/\d+\/)$/g;
    return path.replace(regex, '') === menuPath.replace(regex, '');
  };

  /**
     url로 현재 메뉴 index 구하기
  * @version 1.0.0
  * @author 2hyunkook
  */
  const getSelected = () => {
    for( let i = 0; i < tabMenu.length; i++ ){
      if( isMenuPath (location.pathname, tabMenu[i].path) ){
        setStateSelected(i);
        break;
      }
    }
  };

  /**
     하단 파란 바 위치 설정
  * @version 1.0.0
  * @author 2hyunkook
  */
  const setPosition = (menuElement) => {
    if( menuElement !== undefined ){
      const clientRect = menuElement.getBoundingClientRect();
  
      refBar.current.style.width = `${clientRect.width}px`;
      refBar.current.style.left = `${clientRect.left}px`;
      refBar.current.style.top = `${ window.innerWidth < 960 ? MOBILE_TOP : PC_TOP }px`;
    }
  };

  
  
  //==============================================================================
  // event
  //==============================================================================

  const handleClickMenu = useCallback((item, index) => {
    setStateSelected( index );
    navigate(item.path);
  }, [tabMenu]);

  /**
    scroll 후 position 설정
  * @version 1.0.0
  * @author 2hyunkook
  */
  const handleScroll = (event) => {
    setPosition( refMenus.current[stateSelected] );
  };

  //==============================================================================
  // hook & render
  //==============================================================================

  const renderTabMenuElement = () => {
    return tabMenu.map((item, index) => {
      return (
        <li
          ref={(el) => (refMenus.current[index] = el)}
          key={index}
          className={`${isMenuPath(location.pathname, item.path) ? 'blue' : ''}`}
        >
          <a
            className="pointer"
            onClick={() => handleClickMenu(item, index)}
          >
            {item.name}
          </a>
        </li>
      );
    });
  };



  /**
     엘리먼트 변화 감지 listener 등록 및 해제 
  * @version 1.0.0
  * @author 2hyunkook
  */
  useLayoutEffect(() => {
    getSelected();
    resizeObserver.observe(refContainer.current);
    
    return () => {
      resizeObserver.unobserve(refContainer.current);
    }
  }, []);

  /**
     클릭 이벤트로 입력된 index로 위치 설정
  * @version 1.0.0
  * @author 2hyunkook
  */
  useEffect(() => {
    if( stateSelected !== undefined ){
      setPosition(refMenus.current[stateSelected]);
    }
  }, [stateSelected]);

  return (
    <div className="hd_tabbox" >
      <div className="tabs ty1" ref={refContainer} data-index={stateSelected} onScroll={handleScroll}>
        <ul className="">{renderTabMenuElement()}</ul>

        <div ref={refBar} className={"product_bar transition"}></div>
      </div>
    </div>
  );
}
