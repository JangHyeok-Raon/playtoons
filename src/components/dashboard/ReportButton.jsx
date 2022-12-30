import { showPopup } from '@/common/common';
import { useDispatch } from 'react-redux';
import ReportPopup from './ReportPopup';

export default function ReportButton(props) {
  const { className, text, onClick } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    showPopup(dispatch, text, <ReportPopup callback={(type, content) => onClick?.(type, content)} /> );
  };

  return (
    <>
      <div className={`btn-pk s blue2 ${className}`} onClick={() => handleClick()}>{text}</div>
    </>
  )
}
