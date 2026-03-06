import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ButtonDefault } from "./Button";
import { InputField } from "./Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { Field, FieldContent, FieldLabel } from './ui/field';
import { conversation } from '@/services/conversation';
import { addOrUpdateConversation, updateConversation } from '@/stores/slices/conversationSlice';



function RenameModal({ open, onOpenChange, title, conversationId }) {

    const [value, setValue] = useState()
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: ""
        }
    })

    useEffect(() => {
        if (title) {
            reset({ title })
        }
    }, [title, reset])



    const submitHandler = async (data) => {
        try {
            const response = await conversation.update({ title: data.title, conversationId })
            console.log(response);

            if (response) {
                dispatch(updateConversation({
                    _id: response.data.data._id,
                    title: response.data.data.title
                }))
                onOpenChange(false)

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-sm" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Rename Title</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Field className="mb-3">
                            <FieldLabel>
                                Title
                            </FieldLabel>
                            <FieldContent>
                                <InputField
                                    type="text"
                                    {...register("title")}
                                />
                            </FieldContent>
                        </Field>
                        <DialogFooter>
                            <ButtonDefault
                                type='submit'
                                children="Save"
                            />
                            <ButtonDefault
                                type='button'
                                children="Cancel"
                                onClick={() => onOpenChange(false)}
                            />
                        </DialogFooter>
                    </form>
                </DialogContent >
            </Dialog>
        </div>
    )
}

export { RenameModal }