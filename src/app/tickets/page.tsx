
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {ArrowLeft, Plane, Ticket as TicketIcon, QrCode} from 'lucide-react';
import Link from 'next/link';

const Barcode = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 160 40">
        <rect width="2" height="40" x="0" fill="currentColor"/>
        <rect width="1" height="40" x="4" fill="currentColor"/>
        <rect width="2" height="40" x="7" fill="currentColor"/>
        <rect width="1" height="40" x="11" fill="currentColor"/>
        <rect width="4" height="40" x="13" fill="currentColor"/>
        <rect width="2" height="40" x="19" fill="currentColor"/>
        <rect width="1" height="40" x="23" fill="currentColor"/>
        <rect width="3" height="40" x="25" fill="currentColor"/>
        <rect width="1" height="40" x="30" fill="currentColor"/>
        <rect width="2" height="40" x="33" fill="currentColor"/>
        <rect width="4" height="40" x="36" fill="currentColor"/>
        <rect width="1" height="40" x="42" fill="currentColor"/>
        <rect width="2" height="40" x="45" fill="currentColor"/>
        <rect width="2" height="40" x="49" fill="currentColor"/>
        <rect width="1" height="40" x="53" fill="currentColor"/>
        <rect width="4" height="40" x="55" fill="currentColor"/>
        <rect width="2" height="40" x="61" fill="currentColor"/>
        <rect width="3" height="40" x="64" fill="currentColor"/>
        <rect width="1" height="40" x="69" fill="currentColor"/>
        <rect width="2" height="40" x="72" fill="currentColor"/>
        <rect width="1" height="40" x="76" fill="currentColor"/>
        <rect width="4" height="40" x="78" fill="currentColor"/>
        <rect width="2" height="40" x="84" fill="currentColor"/>
        <rect width="1" height="40" x="88" fill="currentColor"/>
        <rect width="3" height="40" x="90" fill="currentColor"/>
        <rect width="1" height="40" x="95" fill="currentColor"/>
        <rect width="2" height="40" x="98" fill="currentColor"/>
        <rect width="4" height="40" x="101" fill="currentColor"/>
        <rect width="1" height="40" x="107" fill="currentColor"/>
        <rect width="2" height="40" x="110" fill="currentColor"/>
        <rect width="2" height="40" x="114" fill="currentColor"/>
        <rect width="1" height="40" x="118" fill="currentColor"/>
        <rect width="4" height="40" x="120" fill="currentColor"/>
        <rect width="2" height="40" x="126" fill="currentColor"/>
        <rect width="3" height="40" x="129" fill="currentColor"/>
        <rect width="1" height="40" x="134" fill="currentColor"/>
        <rect width="2" height="40" x="137" fill="currentColor"/>
        <rect width="1" height="40" x="141" fill="currentColor"/>
        <rect width="4" height="40" x="143" fill="currentColor"/>
        <rect width="2" height="40" x="149" fill="currentColor"/>
        <rect width="1" height="40" x="153" fill="currentColor"/>
        <rect width="3" height="40" x="155" fill="currentColor"/>
        <rect width="1" height="40" x="159" fill="currentColor"/>
    </svg>
)

const tickets = [
    {
        from: { code: 'NRT', city: 'Tokyo' },
        to: { code: 'UKY', city: 'Kyoto' },
        flight: 'VY-821',
        passenger: 'Alex Doe',
        date: '28 Oct 2024',
        departs: '10:30 AM',
        gate: 'D12',
        seat: '24A',
        boardingTime: '09:45 AM',
    },
    {
        from: { code: 'CDG', city: 'Paris' },
        to: { code: 'JFK', city: 'New York' },
        flight: 'AF-006',
        passenger: 'Alex Doe',
        date: '15 Nov 2024',
        departs: '08:00 PM',
        gate: 'A38',
        seat: '12B',
        boardingTime: '07:15 PM',
    },
    {
        from: { code: 'LHR', city: 'London' },
        to: { code: 'DXB', city: 'Dubai' },
        flight: 'EK-002',
        passenger: 'Alex Doe',
        date: '02 Dec 2024',
        departs: '01:20 PM',
        gate: 'B45',
        seat: '33F',
        boardingTime: '12:35 PM',
    },
]

export default function TicketsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TicketIcon /> My Tickets
          </CardTitle>
          <CardDescription>
            Here are your upcoming flight details.
          </CardDescription>
        </CardHeader>
      </Card>
      
      {tickets.map((ticket, index) => (
        <Card key={index} className="bg-white dark:bg-slate-900 shadow-lg relative font-sans">
            <div className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
                <p className="font-bold uppercase tracking-wider">Boarding Pass</p>
                <Button variant="outline" size="sm" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">Download</Button>
            </div>
            <div className="flex">
                <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                            <p className="text-5xl font-bold text-gray-800 dark:text-gray-200">{ticket.from.code}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.from.city}</p>
                        </div>
                        <div className="text-center text-gray-400 dark:text-gray-500">
                            <Plane className="h-8 w-8 mx-auto"/>
                            <p className="text-xs mt-1">Flight {ticket.flight}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                            <p className="text-5xl font-bold text-gray-800 dark:text-gray-200">{ticket.to.code}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.to.city}</p>
                        </div>
                    </div>
                    <Separator className="my-4 bg-gray-200 dark:bg-gray-700"/>
                    <div className="grid grid-cols-3 gap-4 text-center md:text-left text-gray-800 dark:text-gray-200">
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Passenger</p>
                            <p className="font-medium">{ticket.passenger}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Date</p>
                            <p className="font-medium">{ticket.date}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Departs</p>
                            <p className="font-medium">{ticket.departs}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Gate</p>
                            <p className="font-medium">{ticket.gate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Seat</p>
                            <p className="font-medium">{ticket.seat}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Boarding Time</p>
                            <p className="font-medium">{ticket.boardingTime}</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Barcode className="w-full max-w-xs mx-auto text-black dark:text-white" />
                    </div>
                </div>
                
                <div className="absolute top-16 bottom-0 left-2/3 hidden md:block">
                    <div className="h-full border-l-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                    <div className="absolute -top-4 left-[-17px] h-8 w-8 rounded-full bg-background border-dashed border-t-2 border-b-2 border-l-2 border-gray-300 dark:border-gray-600"></div>
                    <div className="absolute -bottom-4 left-[-17px] h-8 w-8 rounded-full bg-background border-dashed border-t-2 border-b-2 border-l-2 border-gray-300 dark:border-gray-600"></div>
                </div>

                <div className="w-1/3 p-6 flex-col items-center justify-between bg-gray-50 dark:bg-slate-800 rounded-r-lg relative hidden md:flex">
                    <div className="text-center w-full">
                        <p className="font-bold text-blue-600">VOYATO</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">FLIGHT {ticket.flight}</p>
                        <Separator className="my-2 bg-gray-200 dark:bg-gray-700"/>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Passenger</p>
                        <p className="font-medium text-sm text-gray-800 dark:text-gray-200">{ticket.passenger}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-2">Seat</p>
                        <p className="font-bold text-lg text-gray-800 dark:text-gray-200">{ticket.seat}</p>
                    </div>
                    <div className="w-full">
                        <QrCode className="w-full h-auto max-w-[120px] mx-auto text-black dark:text-white"/>
                    </div>
                    <div className="absolute bottom-6 left-0 right-0">
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400">Scan at gate</p>
                    </div>
                </div>
            </div>
        </Card>
      ))}

      {tickets.length === 0 && (
        <Card className="text-center">
            <CardHeader>
            <CardTitle>No more tickets</CardTitle>
            <CardDescription>
                You have no other upcoming flights.
            </CardDescription>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
