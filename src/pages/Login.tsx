import {Link} from "react-router-dom";

export function Login(){
    return(
        <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5'>
                    <div className='card shadow-sm'>
                        <div className='card-body p-4'>
                            <h3 className='text-center mb-4'>Đăng nhập</h3>
                            <form>
                                <div className='mb-3'>
                                    <label className='form-label'>Tên đăng nhập</label>
                                    <input type='text' className='form-control'/>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Mật khẩu</label>
                                    <input type='password' className='form-control'/>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Đăng nhập</button>
                            </form>
                            <p className='text-center mt-3 mb-0'>
                                Chưa có tài khoản? <Link to='/register'>Đăng ký</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
