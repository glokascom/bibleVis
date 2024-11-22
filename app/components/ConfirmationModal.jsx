import { useState } from 'react'

import { BVButton } from '@/app/components/BVButton'

import { Modal } from './Modal'

const typeList = {
  delete: {
    message: 'Are you sure you want to delete this image? This action cannot be undone.',
    left: 'Cancel',
    right: 'Delete',
    color: 'danger',
    successMessage: 'The image has been successfully deleted',
  },
  save: {
    message: 'Do you want to save the changes to this image?',
    left: 'Cancel',
    right: 'Save',
    color: 'primary',
    successMessage: 'The image has been successfully saved',
  },
  publish: {
    message: 'Do you want to publish this image?',
    left: 'Cancel',
    right: 'Publish',
    color: 'primary',
    successMessage: 'The image has been successfully published!',
  },
  cancel: {
    message:
      'Are you sure you want to discard all changes? Any unsaved work will be lost.',
    left: 'Cancel',
    right: 'Discard',
    color: 'danger',
    successMessage: false,
  },
}

function ConfirmationModal({ closeModal, handle, type, isHandleSuccess }) {
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = async () => {
    setIsLoading(true)
    await handle()
    setIsLoading(false)
    closeModal()
  }
  return (
    <Modal closeModal={!isLoading && closeModal}>
      <div className="max-w-md rounded-xlarge bg-background p-10 text-center text-semixlarge font-medium">
        {isHandleSuccess && typeList[type].successMessage ? (
          <p className="py-7">{typeList[type].successMessage}</p>
        ) : (
          <>
            <p>{typeList[type].message}</p>
            <div className="mt-12 flex justify-center gap-2">
              <BVButton
                color="default"
                className="w-1/2"
                onPress={isLoading ? () => {} : closeModal}
                isDisabled={isLoading}
              >
                {typeList[type].left}
              </BVButton>

              <BVButton
                color={typeList[type].color}
                onPress={handleClick}
                className="w-1/2"
                isLoading={isLoading}
              >
                {typeList[type].right}
              </BVButton>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default ConfirmationModal
