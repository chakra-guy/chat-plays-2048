import React from "react"
import PropTypes from "prop-types"
import Modal from "react-responsive-modal"

import { ModalContent } from "../styles"

export default function WinLoseModal({ stage, restartGame }) {
  const isOpen = stage !== "running"

  return (
    <Modal open={isOpen} onClose={restartGame}>
      <ModalContent>
        {stage === "game_won" ? "You won!" : "You lost"}
        <button type="button" onClick={restartGame}>
          Restart Game
        </button>
      </ModalContent>
    </Modal>
  )
}

WinLoseModal.propTypes = {
  stage: PropTypes.string.isRequired,
  restartGame: PropTypes.func.isRequired,
}
