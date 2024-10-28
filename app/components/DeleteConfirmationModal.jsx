import { useState } from 'react'

import { BVButton } from '@/app/components/BVButton'

import { Modal } from './Modal'

const DeleteConfirmationModal = ({
  isDeleteModalOpen,
  closeModal,
  handleDelete,
  isDeleteSuccess,
  deleteError,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleDeleteClick = async () => {
    setIsLoading(true)
    await handleDelete()
    setIsLoading(false)
    closeModal()
  }

  return (
    <>
      {isDeleteModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="rounded-xlarge bg-background p-10 text-semixlarge font-medium">
            {isDeleteSuccess ? (
              <p className="py-7">The image has been successfully deleted</p>
            ) : (
              <>
                <p>
                  Are you sure you want to delete this image? This action cannot be
                  undone.
                </p>
                {deleteError && <p className="mt-4 text-red-600">{deleteError}</p>}
                <div className="mt-12 flex justify-center gap-2">
                  <BVButton
                    className="w-1/2 bg-secondary-50 text-inherit"
                    onClick={closeModal}
                    disabled={isLoading}
                  >
                    Cancel
                  </BVButton>
                  <BVButton
                    onClick={handleDeleteClick}
                    className="w-1/2 bg-danger"
                    isLoading={isLoading}
                  >
                    Delete
                  </BVButton>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeleteConfirmationModal
