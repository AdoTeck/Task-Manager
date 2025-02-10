import Link from 'next/link'
import { LayoutDashboard, Clock, CheckSquare, FileText, Settings, File } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard', href: '/dashboard' },
    { icon: File, text: 'Projects', href: '/dashboard/projects' },
    { icon: Clock, text: 'Time Sheet', href: '/dashboard/time-sheet' },
    { icon: CheckSquare, text: 'Todo', href: '/dashboard/todo' },
    { icon: FileText, text: 'Report', href: '/dashboard/reports' },
    { icon: FileText, text: 'Users', href: '/dashboard/users' },
    { icon: Settings, text: 'Settings', href: '/settings' },
  ]

  return (
    <aside
      className={`bg-white w-64 min-h-screen fixed lg:static lg:translate-x-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30 shadow-lg`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center text-gray-700 hover:bg-yellow-100 rounded-lg p-2 transition-colors duration-200"
              >
                <item.icon className="h-6 w-6 text-yellow-500 mr-3" />
                <span>{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
