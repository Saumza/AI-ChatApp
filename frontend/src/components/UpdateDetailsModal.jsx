import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ButtonDefault } from "./Button";
import { InputField } from "./Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { Field, FieldContent, FieldLabel } from './ui/field';
import { conversation } from '@/services/conversation';
import { addOrUpdateConversation } from '@/stores/slices/conversationSlice';
import { authService } from '@/services/authentication';
import { login } from '@/stores/slices/authSlice';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from './ui/spinner';

function UpdateDetailsModal({ open, onOpenChange, updateSubmitHandler, updateHandler }) {

    const userData = useSelector((state) => state.auth.userData)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: userData.name,
            username: userData.username
        }
    })

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-sm" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle className="font-giest text-[1.4rem]">Update Details</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(updateSubmitHandler)}>
                        <Field className="mb-3">
                            <FieldLabel className="font-giest text-[1rem] font-normal">
                                Name
                            </FieldLabel>
                            <FieldContent>
                                <InputField
                                    type="text"
                                    classname="h-10 font-giest text-sm"
                                    {...register("name")}
                                />
                            </FieldContent>
                        </Field>
                        <Field className="mb-3">
                            <FieldLabel className="font-giest text-[1rem] font-normal">
                                Username
                            </FieldLabel>
                            <FieldContent>
                                <InputField
                                    type="text"
                                    classname="h-10 font-giest text-sm"
                                    {...register("username")}
                                />
                            </FieldContent>
                        </Field>
                        <Field className="mb-3">
                            <FieldLabel className="font-giest text-[1rem] font-normal">
                                Image
                            </FieldLabel>
                            <FieldContent>
                                <InputField
                                    type="file"
                                    classname="h-10 font-giest text-sm py-2.5 text-muted-foreground"
                                    {...register("avatar")}
                                />
                            </FieldContent>
                        </Field>
                        <DialogFooter>
                            <ButtonDefault
                                disabled={updateHandler.isPending}
                                type='submit'
                                children={updateHandler.isPending ? <Spinner data-icon="inline-start" className="size-6" /> : "Save"}
                                className="w-fit h-fit rounded-xl font-giest text-[1rem] mb-3.5"
                            />
                            <ButtonDefault
                                type='button'
                                disabled={updateHandler.isPending}
                                children="Cancel"
                                className="w-fit h-fit rounded-xl font-giest text-[1rem] mb-3.5"
                                onClick={() => onOpenChange(false)}
                            />
                        </DialogFooter>
                    </form>
                </DialogContent >
            </Dialog>
        </div>
    )
}

export default UpdateDetailsModal