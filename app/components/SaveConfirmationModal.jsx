import React from 'react'

import { BVButton } from '@/app/components/BVButton'

import { Modal } from './Modal'

function SaveConfirmationModal({
  isSaveModalOpen,
  closeModal,
  handleFormSubmit,
  isLoading,
  isNewImage = true,
}) {
  return (
    <>
      {isSaveModalOpen && (
        <Modal closeModal={isLoading ? () => {} : closeModal}>
          <div className="rounded-xlarge bg-background p-10 text-semixlarge font-medium">
            {isNewImage ? (
              <p>Are you sure you want to upload file?</p>
            ) : (
              <p>Are you sure you want to save edited?</p>
            )}
            <div className="mt-12 flex justify-center gap-2">
              <BVButton
                className="w-1/2 bg-secondary-50 text-inherit"
                onClick={isLoading ? () => {} : closeModal}
                isDisabled={isLoading}
              >
                Cancel
              </BVButton>

              <BVButton
                type="submit"
                onClick={handleFormSubmit}
                className="w-1/2 bg-primary"
                isLoading={isLoading}
              >
                {isNewImage ? <p>Publish</p> : <p>Yes</p>}
              </BVButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default SaveConfirmationModal
