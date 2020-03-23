import React from "react"
import Modal from "react-responsive-modal"

import { ModalContent, Button } from "../styles"

type Props = {
  stage: string
  restartGame: () => void
}

export default function WinLoseModal({ stage, restartGame }: Props) {
  const isOpen = stage !== "running"

  return (
    <div data-testid="modal">
      <Modal open={isOpen} onClose={restartGame}>
        <ModalContent>
          {stage === "game_won" ? `You won! 🎉` : `You lost 💀`}
          <Button type="button" onClick={restartGame}>
            Restart Game
          </Button>
        </ModalContent>
      </Modal>
    </div>
  )
}
