import React from 'react';
import style from "./Notify.css";


function Notify({ error, message, setOpenNotify }) {

    return (
        <div className="modal-content">
            <div class="modal-header"><div class="txt-bold font13">
                <span class="txt-red">FALTH</span> Thông báo</div>
            </div><div class="modal-body">
                <p class="font15">
                    <span>{message}</span>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-red align-right" onClick={() => setOpenNotify(false)}>Ok</button>
            </div>
        </div>
    )
}

export default Notify;
