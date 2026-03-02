import React from 'react'
import { ButtonDefault } from '../../components/Button'
import { InputField } from '../../components/Input'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { authService } from '@/services/authentication'
import { login } from '@/stores/slices/authSlice'
import { Field, FieldLabel, FieldContent, FieldError } from '../../components/ui/field'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Link, useNavigate } from 'react-router'
import { Spinner } from '../../components/ui/spinner'

function PasswordChangePage() {

    const { verificationToken } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const changePasswordHandler = useMutation({
        mutationFn: async (data) => {
            try {
                return await authService.resetPassword({ newPassword: data.newPassword, verificationToken });
            } catch (err) {
                throw err;
            }
        },
        onSuccess: (response) => {
            dispatch(login(response.data)),
                navigate("/")  // NAVIGATION IS LEFT
        },
        onError: (error) => {
            setError(error.message)
        }
    })

    const submitHandler = async (data) => {
        changePasswordHandler.mutate(data)
    }

    if (changePasswordHandler.isError) {
        return (
            <div className='w-full min-h-screen bg-black text-white font-giest p-4'>
                {error}
            </div>
        );
    }
    return (
        <div className="relative flex items-center justify-center min-h-screen p-4 bg-background bg-cover overflow-hidden" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/cf/78/fe/cf78fe788b403ff3d41784153b10d20d.jpg')" }}>
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-background" />
                <div className="absolute top-1/3 left-1/2 w-125 h-125 -translate-x-1/2 bg-primary/20 rounded-full blur-[180px] opacity-40" />
            </div>
            <Card className="w-full max-w-md backdrop-blur-xl bg-background/50 border-border/40 shadow-xl animate-fadeIn p-5 gap-1">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-[1.8rem] font-giest">
                        Reset Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submitHandler)} className="my-7">
                        <Field data-invalid={!!errors.newPassword} className="mb-4">
                            <FieldContent>
                                <InputField
                                    placeholder="Password"
                                    type="password"
                                    {...register("newPassword", { required: "Password is Required" })}
                                    classname="h-10 font-giest text-sm"
                                />
                            </FieldContent>
                            <FieldError className="ml-1 font-giest">{errors.newPassword?.message}</FieldError>
                        </Field>
                        <CardFooter className="flex flex-col justify-center p-0 mt-8">
                            <ButtonDefault type='submit' disabled={changePasswordHandler.isPending} children={changePasswordHandler.isPending ? <Spinner data-icon="inline-start" className="size-6" /> : "Change Password"} className="w-full h-12 rounded-xl font-giest text-[1rem] mb-3.5">
                            </ButtonDefault>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default PasswordChangePage