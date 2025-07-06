/**
 * Project Name: Token Sender/ TxOne
 * Author: Divyanshu
 * Description: A React/Next.js-based ERC20 token airdrop UI for distributing tokens to multiple recipients in a single transaction.
 */

# TokenSender

TokenSender is a React/Next.js-based ERC20 token airdrop UI that allows users to distribute tokens to multiple recipients in a single transaction. It integrates wallet functionality using `wagmi` and `viem`, and provides a user-friendly interface with features like local storage persistence, error handling, and transaction summaries.

## Features

- **Wallet Integration**: Connect your wallet using `wagmi` and `rainbowkit`.
- **Token Airdrop**: Send ERC20 tokens to multiple recipients in one transaction.
- **Local Storage**: Automatically saves form data (token address, recipients, amounts) for convenience.
- **Token Name Fetching**: Automatically fetches and displays the token name from the ERC20 contract.
- **Error Handling**: Alerts and handles errors gracefully during contract interactions.
- **Responsive UI**: Modern and responsive design with loading spinners and transaction summaries.

## Prerequisites

- Node.js (v16 or later)
- pnpm (preferred package manager)
- A supported Ethereum wallet (e.g., MetaMask)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tokenSender
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. Connect your wallet using the "Connect Wallet" button.
2. Enter the ERC20 token address, recipients, and amounts in the form.
3. Review the transaction summary and click "Send Airdrop" to distribute tokens.

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm lint`: Run linting checks.
- `pnpm test:unit`: Run unit tests with coverage.
- `pnpm test:e2e`: Run end-to-end tests using Synpress.

## Testing

### Unit Tests

Run unit tests with coverage:

```bash
pnpm test:unit
```

### End-to-End Tests

Run e2e tests using Synpress:

```bash
pnpm test:e2e
```

## Project Structure

```plaintext
src/
├── app/                # Next.js app directory
├── components/         # Reusable React components
│   ├── AirdropForm.tsx # Main airdrop form logic
│   ├── Header.tsx      # Header component
│   └── UI/             # UI components (e.g., InputField)
├── utils/              # Utility functions
│   └── calculateTotal/ # Total calculation logic
public/                 # Static assets (e.g., images, logo)
```

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Next.js**: Framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **wagmi**: React hooks for Ethereum wallet integration.
- **viem**: Ethereum client for contract interactions.
- **RainbowKit**: Wallet connection UI.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## Acknowledgments

- [wagmi](https://wagmi.sh/)
- [RainbowKit](https://www.rainbowkit.com/)
- [Tailwind CSS](https://tailwindcss.com/)