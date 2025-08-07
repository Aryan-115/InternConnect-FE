import React from 'react'
import { Popover } from '../popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '../button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    const { user } = useSelector(store => store.auth);
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Intern<span className='text-[#F83002]'>Connect</span></h1>
                </div>
                <div className='flex items-center gap-2'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                               <>
                               <li><Link to="/">Home</Link></li>
                               <li><Link to="/jobs">Jobs</Link></li>
                               <li><Link to="/browse">Browse</Link></li>
                               </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button>Signup</Button></Link>
                            </div>
                        ) : (
                            <div className='avatar'>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar>
                                            <div className='avatar img'>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </div>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-80'>
                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar>
                                                <div className='avatar img'>
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </div>
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar