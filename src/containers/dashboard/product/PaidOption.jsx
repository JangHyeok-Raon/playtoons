import React from "react";

const PaidOption = () => {
  return (
    <>
      <ul class="lst_option_wrap1">
        <li>
          <div class="lst_option1">
            <div class="first">
              <p class="h1">オプション名</p>
              <input
                type="text"
                class="inp_txt w100p"
                placeholder="オプション名"
              />
            </div>
            <div class="fx mb0">
              <p class="h1">オプションの内容</p>
              <p class="h1">値段</p>
            </div>
            <div class="fx">
              <input type="text" class="inp_txt w100p" placeholder="内容" />
              <input type="text" class="inp_txt w100p" placeholder="値段" />
            </div>
            <div class="fx">
              <input type="text" class="inp_txt w100p" placeholder="内容" />
              <input type="text" class="inp_txt w100p" placeholder="値段" />
              <button type="button" class="btns btn_subtraction">
                <span>
                  <i class="fa-solid fa-minus"></i>
                </span>
              </button>
            </div>
            <div class="fx">
              <input type="text" class="inp_txt w100p" placeholder="内容" />
              <input type="text" class="inp_txt w100p" placeholder="値段" />
              <button type="button" class="btns btn_subtraction">
                <span>
                  <i class="fa-solid fa-minus"></i>
                </span>
              </button>
            </div>
            <div class="fx">
              <button type="button" class="btn-pk gray2 n w100p">
                <span>
                  <i class="fa-solid fa-plus"></i>
                </span>
              </button>
            </div>
          </div>

          <button type="button" class="btn_option">
            <span>
              <i class="fa-solid fa-trash-xmark"></i>オプション削除
            </span>
          </button>
        </li>
        <li>
          <div class="lst_option1">
            <div class="first">
              <p class="h1">オプション名</p>
              <input
                type="text"
                class="inp_txt w100p"
                placeholder="オプション名"
              />
            </div>
            <div class="fx mb0">
              <p class="h1">オプションの内容</p>
              <p class="h1">値段</p>
            </div>
            <div class="fx">
              <input type="text" class="inp_txt w100p" placeholder="内容" />
              <input type="text" class="inp_txt w100p" placeholder="値段" />
            </div>
            <div class="fx">
              <input type="text" class="inp_txt w100p" placeholder="内容" />
              <input type="text" class="inp_txt w100p" placeholder="値段" />
              <button type="button" class="btns btn_subtraction">
                <span>
                  <i class="fa-solid fa-minus"></i>
                </span>
              </button>
            </div>
            <div class="fx">
              <button type="button" class="btn-pk gray2 n w100p">
                <span>
                  <i class="fa-solid fa-plus"></i>
                </span>
              </button>
            </div>
          </div>

          <button type="button" class="btn_option">
            <span>
              <i class="fa-solid fa-trash-xmark"></i>オプション削除
            </span>
          </button>
        </li>
      </ul>

      <button type="button" class="btn-pk n blue2 options">
        <span>
          <i class="fa-solid fa-plus"></i>有料オプション追加
        </span>
      </button>
    </>
  );
};

export default PaidOption;
