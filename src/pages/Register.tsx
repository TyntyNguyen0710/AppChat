import {Link} from "react-router-dom";

export function Register(){
    return(
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='card shadow-sm'>
                        <div className='card-body p-4'>
                            <h3 className='text-center mb-4'>Đăng ký</h3>
                            <form>
                                <div className='mb-3'>
                                    <label className='form-label'>Tên đăng nhập</label>
                                    <input type='text' className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Mật khẩu</label>
                                    <input type='password' className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Nhập lại mật khẩu</label>
                                    <input type='password' className='form-control'/>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Đăng ký</button>
                            </form>
                            <p className='text-center mt-3 mb-0'>
                                Đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
