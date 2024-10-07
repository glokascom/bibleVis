'use client'

import React, { useState } from 'react'

import { Switch } from '@nextui-org/react'
import Cookies from 'js-cookie'

import BVButton from './BVButton'
import { Modal } from './Modal'

function CookiesModal({ handleAfterClick, children }) {
  const [modal, setModal] = useState(false)
  const [analytics, setAnalytics] = useState(() => {
    const consent = Cookies.get('userConsent')
    if (consent) {
      return JSON.parse(consent).analytics
    }
    return true
  })
  const [ads, setAds] = useState(() => {
    const consent = Cookies.get('userConsent')
    if (consent) {
      return JSON.parse(consent).ads
    }
    return true
  })

  const handleCustomize = (consent) => {
    Cookies.set('userConsent', JSON.stringify(consent), { expires: 365 })
    hideBanner()
    if (typeof handleAfterClick === 'function') {
      handleAfterClick()
    }
  }

  const hideBanner = () => {
    setModal(false)
  }

  const childrenWithClick = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onClick: () => setModal(true) })
    }
    return child
  })

  const acceptAllHandler = () => {
    setAnalytics(true)
    setAds(true)
    handleCustomize({
      analytics: true,
      ads: true,
      functional: true,
    })
    if (typeof handleAfterClick === 'function') {
      handleAfterClick()
    }
  }

  const savePreferenceHandler = () => {
    handleCustomize({
      functional: true,
      analytics,
      ads,
    })
    if (typeof handleAfterClick === 'function') {
      handleAfterClick()
    }
  }

  return (
    <>
      {childrenWithClick}
      {modal && (
        <Modal showCloseButton={true} closeModal={hideBanner}>
          <div className="rounded-xlarge bg-background p-10 text-semixlarge font-medium text-secondary">
            <div className="mb-5 flex items-center justify-between gap-4 text-medium">
              <p>Essential Cookies</p>
              <p className="mr-5 text-small">Always On</p>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4 text-medium">
              <p>Analytics Cookies</p>
              <Switch
                isSelected={analytics}
                onChange={() => {
                  setAnalytics((prev) => !prev)
                }}
                classNames={{
                  wrapper: 'mr-5',
                }}
              />
            </div>

            <div className="mb-5 flex items-center justify-between gap-4 text-medium">
              <p>Advertising Cookies</p>
              <Switch
                isSelected={ads}
                onChange={() => {
                  setAds((prev) => !prev)
                }}
                classNames={{
                  wrapper: 'mr-5',
                }}
              />
            </div>
            <div className="mt-12 flex flex-col justify-center gap-6 md:flex-row">
              <BVButton flat color="secondary" onPress={savePreferenceHandler}>
                Save Preferences
              </BVButton>
              <BVButton onPress={acceptAllHandler}>Accept All Cookies</BVButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CookiesModal
