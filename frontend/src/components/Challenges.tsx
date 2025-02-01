import React from "react"

interface Challenge {
    id: string
    name: string
    book: string
    totalPages: number
    pagesRead: number
    pagesPerDay: number
}

interface ActiveChallengesProps {
  challenges: Challenge[]
  onCompleteChallenge: (id: string) => void
  onAbandonChallenge: (id: string) => void
}

export const Challenges: React.FC<ActiveChallengesProps> = ({
  challenges,
  onCompleteChallenge,
  onAbandonChallenge,
}) => {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Retos Activos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <div key={challenge.id}>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3>{challenge.name}</h3>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p>Libro: {challenge.book}</p>
              <p>
                Progreso: {challenge.pagesRead} de {challenge.totalPages} páginas
              </p>
              <p>Páginas por día: {challenge.pagesPerDay}</p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => onCompleteChallenge(challenge.id)}>Completar</button>
              <button onClick={() => onAbandonChallenge(challenge.id)}>
                Abandonar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}