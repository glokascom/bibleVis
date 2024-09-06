import { BVButton } from '@/app/components/BVButton'

import { Modal } from './Modal'

const DeleteConfirmationModal = ({
  isDeleteModalOpen,
  closeModal,
  handleDelete,
  isDeleteSuccess,
}) => {
  return (
    <>
      {isDeleteModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="rounded-xlarge bg-background p-10 text-semixlarge font-medium">
            {isDeleteSuccess ? (
              <p className="py-7">The image was successfully deleted</p>
            ) : (
              <>
                <p>Are you sure to delete the file?</p>
                <div className="mt-12 flex justify-center gap-2">
                  <BVButton
                    className="w-1/2 bg-secondary-50 text-inherit"
                    onClick={closeModal}
                  >
                    Cancel
                  </BVButton>
                  <BVButton onClick={handleDelete} className="w-1/2 bg-danger">
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
