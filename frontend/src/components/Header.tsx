import React from "react"

interface HeaderProps {
  user: {
    name: string
    image: string
    coins: number
  }
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={user.image || "/placeholder.svg"} alt={user.name} width={50} height={50} className="rounded-full" />
        <h1 className="text-2xl font-bold">{user.name}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xl">{user.coins}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </header>
  )
}
