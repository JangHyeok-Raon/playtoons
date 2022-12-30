import { useState } from 'react';

export default function InquiryPopup(props) {
  const { text, item, onClick } = props; 
  const [ stateCheck, setStateCheck ] = useState(!item?.responsePublic);
  const [ stateText, setStateText ] = useState(item?.authorResponse);

  const handleClickConfirm = () => {
    onClick?.(stateCheck, stateText);
  };


  return (
    <>
      <div className='label'>{text.label_content}</div>
      <div>
        <textarea className='txt' placeholder={text.content_placeHolder} defaultValue={stateText} onChange={(e) => setStateText(e.currentTarget.value)} />
      </div>
      <div className='chkdiv'>
        <label className="inp_checkbox chk">
          <input type="checkbox" defaultChecked={stateCheck} onChange={() => setStateCheck(!stateCheck)} />
          <span>{text.responsePublic}</span>
        </label>
      </div>
      <div className="btn-pk n blue w100p" onClick={() => handleClickConfirm()}>
        {text.confirm}
      </div>
    </>
  )
}
