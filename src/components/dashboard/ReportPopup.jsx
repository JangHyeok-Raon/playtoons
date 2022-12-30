import { useState } from 'react';

export default function ReportPopup(props) {
  //sexual, violence, terror, spam, hateful, harmful, rating, child_abuse, abuse, copyright, other
  const { callback} = props; 
  const [stateValue, setStateValue] = useState(undefined);
  const [stateContent, setStateContent] = useState('');

  const handleChange = (e) => {
    setStateValue(e.target.value);
  };

  return (
    <>
      <div className="pop_report">
        <div className="pop_cont">
          <p className="ta-c">通報する理由を選択してください。</p>

          <fieldset onChange={(e) => handleChange(e)}>
            <label className="inp_radio">
              <input type="radio" name="radio" value="spam" defaultChecked />
              <span>スパム</span>
            </label>
            <label className="inp_radio">
              <input type="radio" name="radio" value="hateful" />
              <span>迷惑行為</span>
            </label>
            <label className="inp_radio">
              <input type="radio" name="radio" value="harmful" />
              <span>出会い目的</span>
            </label>
            <label className={`inp_radio ${stateValue === 'other' ? 'mb16' : 'mb40'}`}>
              <input type="radio" name="radio" value="other"  />
              <span>その他</span>
            </label>
          </fieldset>
          <textarea
            className={`textarea1 ${stateValue === 'other' ? 'show' : ''}`}
            placeholder="詳細(任意)"
            onChange={(e) => setStateContent(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='flex'>
        <div className="btn-pk n blue w100p " onClick={() => callback?.(stateValue, stateContent)}>
          {'通報する'}
        </div>
      </div>
    </>
  )
}
