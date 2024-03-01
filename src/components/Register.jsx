import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageClear, customer_register } from '../store/reducer/authReducer'
import { toast } from 'react-hot-toast'



const InitialState = {
    name: '',
    email: '',
    phone: '',
    password: ''
}



const Register = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState(InitialState)


    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth)

    console.log(userInfo)

    const handler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(customer_register(user))
        setUser(InitialState)
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (userInfo) {
            navigate('/')
        }
    }, [successMessage, errorMessage])



    return (
        <div>
            <div className='m-5 '>
                <section className="text-black-500 my-20 ">


                    <div className='flex flex-col shadow-sm  md:w-1/3 px-10 md:mx-auto  py-10 bg-primary-100'>

                        <div className='flex justify-between'>
                            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Register</h2>
                        </div>

                        <form onSubmit={submit}>
                            <div className="relative mb-2">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" onChange={handler} value={user.name} required placeholder='Md Imran Khan' className="w-full text-sm bg-white rounded border    py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>

                            <div className="relative mb-2">
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" name="email" placeholder='imran@gmail.com' onChange={handler} required value={user.email} className="w-full bg-white rounded border   py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>



                            <div className="relative mb-2">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="number" id="phone" name="phone" required onChange={handler} value={user.phone} placeholder='01*********' className="w-full bg-white rounded border  outline-none  py-1 px-3 leading-8 transition-colors duration-200 " min={0} minLength={11} />
                            </div>

                            <div className="relative mb-2">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" onChange={handler} value={user.password} required placeholder='password' className="w-full bg-white rounded border border-gray-300 focus:ring-2  py-1 px-3 outline-none leading-8 t" minLength={6} />
                            </div>

                            <div className="flex flex-center gap-3 mb-2">

                                <input type="checkbox" id="checkbox" name="checkbox" />
                                <label htmlFor="checkbox">Accept our conditions</label>
                            </div>

                            <button disabled={loader ? true : false} className="text-white bg-secondary-500 text-primary-100 w-full  bg-indigo-500 border-0 py-2 uppercase px-8 focus:outline-none hover:bg-indigo-600 font-bold rounded text-lg">
                                Register
                            </button>

                        </form>

                        <p className="text-xs  mt-2">Already have an account? <Link className='text-secondary-400 font-bold' to={'/login'} >Login</Link> </p>

                    </div>


                </section>


            </div>

        </div>
    );
}

export default Register;
