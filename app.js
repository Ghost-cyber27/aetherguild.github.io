let userName = "";
let email = "";
let jobClass = "";
let selectedSkills = [];
let password = "";

const questionBanks = {
  web: [
    {
      q: "1. How do you prevent layout shifts during asynchronous component hydration in modern Single Page Apps?",
      options: [
        { text: "Use placeholders & skeleton screens", score: 2 },
        { text: "Let the browser handle re-flow", score: 0 },
        { text: "Disable JavaScript altogether", score: 1 },
      ],
    },
    {
      q: "2. Which HTTP status code represents a resource successfully created?",
      options: [
        { text: "200 OK", score: 0 },
        { text: "201 Created", score: 2 },
        { text: "204 No Content", score: 1 },
      ],
    },
    {
      q: "3. What is the primary benefit of utilizing Server-Side Rendering (SSR) over CSR?",
      options: [
        { text: "Faster initial page load and SEO indexability", score: 2 },
        { text: "Lower server costs", score: 0 },
        { text: "Easier CSS styling", score: 1 },
      ],
    },
    {
      q: "4. How do you mitigate cascading re-renders in deep React component trees?",
      options: [
        { text: "Wrap everything in useEffect", score: 0 },
        {
          text: "Use memoization hooks (useMemo, useCallback) and flat state architecture",
          score: 2,
        },
        { text: "Never pass props", score: 1 },
      ],
    },
    {
      q: "5. What does CORS stand for and what problem does it solve?",
      options: [
        {
          text: "Cross-Origin Resource Sharing; restricts unauthorized domains from fetching restricted endpoints",
          score: 2,
        },
        { text: "Client Object Rendering System; builds UI layouts", score: 0 },
        { text: "Centralized Online Routing Service; manages DNS", score: 1 },
      ],
    },
    {
      q: "6. How do you handle database connection exhaustion under heavy concurrent request spikes?",
      options: [
        { text: "Increase server RAM infinitely", score: 0 },
        {
          text: "Implement connection pooling and query caching layers (e.g. Redis)",
          score: 2,
        },
        { text: "Restart the database every hour", score: 1 },
      ],
    },
    {
      q: "7. Which tool is best suited for typing complex API JSON responses safely?",
      options: [
        { text: "Plain JavaScript Objects", score: 0 },
        {
          text: "TypeScript interfaces or Zod runtime validation schemas",
          score: 2,
        },
        { text: "CSS preprocessors", score: 1 },
      ],
    },
    {
      q: "8. How do you secure user authentication tokens stored in client-side applications?",
      options: [
        { text: "Save them in localStorage in plain text", score: 0 },
        { text: "Store HTTP-only, secure, same-site cookies", score: 2 },
        { text: "Hardcode them in the source code", score: 1 },
      ],
    },
    {
      q: "9. What is the purpose of database indexing?",
      options: [
        {
          text: "To speed up data retrieval operations at the cost of write performance",
          score: 2,
        },
        { text: "To encrypt passwords", score: 0 },
        { text: "To create backup files automatically", score: 1 },
      ],
    },
    {
      q: "10. How do you debug memory leaks in a Node.js web server backend?",
      options: [
        {
          text: "Analyze heap snapshots using Chrome DevTools or clinic.js",
          score: 2,
        },
        { text: "Add more console.log statements", score: 0 },
        { text: "Reinstall the operating system", score: 1 },
      ],
    },
  ],
  backend: [
    {
      q: "1. What is the key advantage of asynchronous event-driven architectures over synchronous REST calls?",
      options: [
        {
          text: "Decoupled services, higher fault tolerance, and non-blocking throughput",
          score: 2,
        },
        { text: "Simpler debugging logs", score: 0 },
        { text: "Zero network latency", score: 1 },
      ],
    },
    {
      q: "2. How do you prevent race conditions during concurrent database updates on a single row?",
      options: [
        {
          text: "Use database transaction isolation levels and SELECT ... FOR UPDATE locking",
          score: 2,
        },
        {
          text: "Trust that the client app won't send requests simultaneously",
          score: 0,
        },
        { text: "Add a 5-second sleep timer", score: 1 },
      ],
    },
    {
      q: "3. What is the purpose of a Database Migration tool (e.g., Alembic, Prisma Migrate)?",
      options: [
        {
          text: "To version-control schema changes systematically across environments",
          score: 2,
        },
        { text: "To automatically generate frontend UI components", score: 0 },
        { text: "To back up hard drives to the cloud", score: 1 },
      ],
    },
    {
      q: "4. How do you design an API rate limiter to protect endpoints from abuse?",
      options: [
        {
          text: "Use Redis with token bucket or sliding window algorithms mapped to IP/User IDs",
          score: 2,
        },
        { text: "Block every 10th user randomly", score: 0 },
        { text: "Throw a 500 error on every request", score: 1 },
      ],
    },
    {
      q: "5. What is the difference between vertical and horizontal scaling?",
      options: [
        {
          text: "Vertical adds more resources to a single server; horizontal adds more server instances",
          score: 2,
        },
        {
          text: "Vertical is for frontend; horizontal is for backend",
          score: 0,
        },
        { text: "They mean the exact same thing", score: 1 },
      ],
    },
    {
      q: "6. How do you securely handle secret API keys and database credentials in production?",
      options: [
        {
          text: "Environment variables loaded via secure secret managers (e.g., AWS Secrets Manager)",
          score: 2,
        },
        { text: "Hardcode them in a config.js file on GitHub", score: 0 },
        { text: "Email them to the team daily", score: 1 },
      ],
    },
    {
      q: "7. What is the primary role of a reverse proxy like Nginx or Traefik?",
      options: [
        {
          text: "Load balancing, SSL termination, and protecting upstream application servers",
          score: 2,
        },
        { text: "Rendering HTML templates", score: 0 },
        { text: "Compiling Python bytecode", score: 1 },
      ],
    },
    {
      q: "8. How do you optimize an N+1 query problem in an ORM (like SQLAlchemy or Prisma)?",
      options: [
        {
          text: "Use eager loading (joins, selectinload, or include parameters)",
          score: 2,
        },
        { text: "Write 100 individual queries in a loop", score: 0 },
        { text: "Disable database logging", score: 1 },
      ],
    },
    {
      q: "9. What is JWT (JSON Web Token) stateless authentication vulnerability if misconfigured?",
      options: [
        {
          text: "Inability to revoke tokens instantly without a blacklist mechanism or short expiry",
          score: 2,
        },
        { text: "Tokens automatically expire after 1 millisecond", score: 0 },
        { text: "Tokens can only be read on mobile devices", score: 1 },
      ],
    },
    {
      q: "10. How do you handle graceful shutdowns in a Node.js/Python FastAPI server?",
      options: [
        {
          text: "Intercept SIGTERM signals, stop accepting new connections, and finish active requests",
          score: 2,
        },
        { text: "Kill the process abruptly using taskkill", score: 0 },
        { text: "Unplug the server power cable", score: 1 },
      ],
    },
  ],
  mobile: [
    {
      q: "1. How do you handle smooth 60fps gesture animations in native/cross-platform mobile apps?",
      options: [
        {
          text: "Use the UI thread for native driver animations instead of the JS bridge",
          score: 2,
        },
        { text: "Animate everything via standard CSS transitions", score: 0 },
        { text: "Disable animations entirely", score: 1 },
      ],
    },
    {
      q: "2. What is the best strategy for local data persistence when offline?",
      options: [
        {
          text: "SQLite / Room / CoreData with a synchronization queue",
          score: 2,
        },
        { text: "Write to a temporary text file on device storage", score: 0 },
        { text: "Keep data only in RAM state", score: 1 },
      ],
    },
    {
      q: "3. How do you handle memory management with images loaded in a mobile list view?",
      options: [
        { text: "Load full resolution images all at once", score: 0 },
        {
          text: "Implement view recycling, lazy loading, and caching libraries (e.g., Glide, Kingfisher)",
          score: 2,
        },
        { text: "Resize images using server side jobs", score: 1 },
      ],
    },
    {
      q: "4. What is the difference between Navigation push and modal presentation paradigms?",
      options: [
        {
          text: "Push stacks hierarchical drill-down views; modals represent temporary task flows",
          score: 2,
        },
        { text: "They are identical in functionality", score: 0 },
        { text: "Modals are only for web browsers", score: 1 },
      ],
    },
    {
      q: "5. How do you manage secure credential storage on iOS and Android devices?",
      options: [
        {
          text: "Keychain (iOS) and EncryptedSharedPreferences (Android)",
          score: 2,
        },
        { text: "Plaintext text file in app bundle", score: 0 },
        { text: "Shared global variables", score: 1 },
      ],
    },
    {
      q: "6. What is the role of deep linking in mobile applications?",
      options: [
        {
          text: "To route users directly to specific in-app states from external URLs or push notifications",
          score: 2,
        },
        { text: "To compile native binaries faster", score: 0 },
        { text: "To optimize battery consumption", score: 1 },
      ],
    },
    {
      q: "7. How do you optimize app bundle size for App Store / Google Play distribution?",
      options: [
        {
          text: "Strip unused assets, enable ProGuard/R8, and use App Bundles (AAB)",
          score: 2,
        },
        { text: "Remove all comments from code files", score: 0 },
        { text: "Include all high-res assets in multiple languages", score: 1 },
      ],
    },
    {
      q: "8. How do you handle push notification token registration changes securely?",
      options: [
        {
          text: "Re-register and sync tokens with backend database upon application launch/refresh",
          score: 2,
        },
        { text: "Hardcode the token value", score: 0 },
        { text: "Ignore notification token expiry", score: 1 },
      ],
    },
    {
      q: "9. What technique prevents excessive battery drain from constant GPS tracking?",
      options: [
        {
          text: "Adjust location accuracy thresholds and trigger updates based on distance traveled intervals",
          score: 2,
        },
        { text: "Poll GPS coordinates every 100 milliseconds", score: 0 },
        { text: "Keep phone screen turned on indefinitely", score: 1 },
      ],
    },
    {
      q: "10. How do you handle multi-threading on mobile platforms to prevent UI thread blocking?",
      options: [
        {
          text: "Offload heavy computations to background workers, isolates, or GCD queues",
          score: 2,
        },
        {
          text: "Run all database queries directly on the main UI thread",
          score: 0,
        },
        { text: "Increase device processor clock speed", score: 1 },
      ],
    },
  ],
  gamedev: [
    {
      q: "1. What is the purpose of Delta Time in game loop physics calculations?",
      options: [
        {
          text: "Ensures movement speed remains consistent regardless of frame rate fluctuations",
          score: 2,
        },
        { text: "Speeds up rendering on slow GPUs", score: 0 },
        { text: "Tracks total gameplay hours", score: 1 },
      ],
    },
    {
      q: "2. How do you optimize collision detection performance in open-world games?",
      options: [
        {
          text: "Use spatial partitioning structures like Quadtrees, Octrees, or Bounding Volume Hierarchies",
          score: 2,
        },
        {
          text: "Check every object against every other object every frame",
          score: 0,
        },
        { text: "Disable collisions completely", score: 1 },
      ],
    },
    {
      q: "3. What is object pooling used for in game development?",
      options: [
        {
          text: "Reusing instantiated objects to avoid garbage collection spikes and memory allocation lag",
          score: 2,
        },
        { text: "Storing player high scores in a pool", score: 0 },
        { text: "Sharing assets over multiplayer networks", score: 1 },
      ],
    },
    {
      q: "4. What is the difference between Update() and FixedUpdate() in game engines like Unity?",
      options: [
        {
          text: "Update runs every frame (variable); FixedUpdate runs at fixed time intervals for physics",
          score: 2,
        },
        { text: "They perform identical tasks", score: 0 },
        { text: "FixedUpdate is only for UI rendering", score: 1 },
      ],
    },
    {
      q: "5. How do you handle state management for complex non-player character (NPC) AI behaviors?",
      options: [
        {
          text: "Use Finite State Machines (FSM), Behavior Trees, or Utility AI systems",
          score: 2,
        },
        {
          text: "Write nested if-else statements inside the render loop",
          score: 0,
        },
        { text: "Hardcode random movement paths", score: 1 },
      ],
    },
    {
      q: "6. What is the primary role of a shader in 3D graphics rendering?",
      options: [
        {
          text: "Executing custom GPU code to calculate lighting, colors, and vertex positions",
          score: 2,
        },
        { text: "Loading audio files into memory", score: 0 },
        { text: "Parsing JSON save files", score: 1 },
      ],
    },
    {
      q: "7. How do you manage client-server synchronization in fast-paced multiplayer games?",
      options: [
        {
          text: "Implement client-side prediction, server reconciliation, and entity interpolation",
          score: 2,
        },
        {
          text: "Trust the client completely with all game state calculations",
          score: 0,
        },
        { text: "Accept high latency without any compensation", score: 1 },
      ],
    },
    {
      q: "8. What is texture batching (or sprite atlasing) used for?",
      options: [
        {
          text: "Combining multiple textures into a single sheet to reduce draw calls and GPU overhead",
          score: 2,
        },
        { text: "Increasing texture resolution to 8K", score: 0 },
        { text: "Compressing game installation files into a zip", score: 1 },
      ],
    },
    {
      q: "9. How do you prevent memory leaks when loading/unloading game scenes?",
      options: [
        {
          text: "Explicitly call garbage collection, unload unused asset bundles, and clear event subscriptions",
          score: 2,
        },
        { text: "Restart the computer after every level", score: 0 },
        { text: "Keep all assets loaded in RAM indefinitely", score: 1 },
      ],
    },
    {
      q: "10. What is the advantage of using NavMesh pathfinding over direct vector movement?",
      options: [
        {
          text: "Automatically calculates walkable surfaces and steers characters around obstacles",
          score: 2,
        },
        { text: "Makes enemies run faster", score: 0 },
        { text: "Reduces game file size", score: 1 },
      ],
    },
  ],
  devops: [
    {
      q: "1. What is the core principle of Infrastructure as Code (IaC)?",
      options: [
        {
          text: "Managing and provisioning computing infrastructure through machine-readable definition files",
          score: 2,
        },
        {
          text: "Manually clicking through cloud provider web consoles",
          score: 0,
        },
        { text: "Writing documentation in Microsoft Word", score: 1 },
      ],
    },
    {
      q: "2. What is the primary benefit of containerization with Docker over virtual machines?",
      options: [
        {
          text: "Shared OS kernel overhead reduction, faster startup times, and consistent environments",
          score: 2,
        },
        { text: "Higher RAM consumption", score: 0 },
        { text: "Inability to run Linux containers", score: 1 },
      ],
    },
    {
      q: "3. How does Kubernetes handle automated container orchestration?",
      options: [
        {
          text: "Manages scaling, self-healing, load balancing, and rolling deployments across a cluster",
          score: 2,
        },
        { text: "Replaces Git version control entirely", score: 0 },
        { text: "Compiles source code into binaries", score: 1 },
      ],
    },
    {
      q: "4. What is a CI/CD pipeline responsible for?",
      options: [
        {
          text: "Automating building, testing, and deployment of code changes to production",
          score: 2,
        },
        { text: "Designing user interface mockups", score: 0 },
        { text: "Conducting marketing campaigns", score: 1 },
      ],
    },
    {
      q: "5. How do you implement zero-downtime deployments in production environments?",
      options: [
        {
          text: "Use blue-green deployment or rolling update strategies behind a load balancer",
          score: 2,
        },
        { text: "Take the server offline for 4 hours at midnight", score: 0 },
        { text: "Delete the database and recreate it", score: 1 },
      ],
    },
    {
      q: "6. What is the difference between horizontal and vertical pod autoscaling in Kubernetes?",
      options: [
        {
          text: "Horizontal adds more pod replicas; vertical adjusts CPU/RAM limits on existing pods",
          score: 2,
        },
        { text: "They change cluster network security rules", score: 0 },
        { text: "They are only used for storage volumes", score: 1 },
      ],
    },
    {
      q: "7. How do you secure secrets inside Kubernetes clusters?",
      options: [
        {
          text: "Use encrypted Kubernetes Secrets or external secret operators linked to Vault/AWS Secrets Manager",
          score: 2,
        },
        {
          text: "Store raw passwords in plain YAML deployment files",
          score: 0,
        },
        { text: "Write passwords as comments in Dockerfiles", score: 1 },
      ],
    },
    {
      q: "8. What is the purpose of a reverse proxy health check in load balancing?",
      options: [
        {
          text: "To automatically route traffic away from failing or unhealthy container instances",
          score: 2,
        },
        { text: "To monitor employee typing speed", score: 0 },
        { text: "To check disk space on developer laptops", score: 1 },
      ],
    },
    {
      q: "9. How do you manage infrastructure drift when using Terraform?",
      options: [
        {
          text: "Run regular plan/apply cycles against remote state files stored securely",
          score: 2,
        },
        { text: "Manually edit servers via SSH", score: 0 },
        { text: "Ignore state mismatches", score: 1 },
      ],
    },
    {
      q: "10. What metrics are vital for monitoring cluster health in a Prometheus/Grafana stack?",
      options: [
        {
          text: "CPU throttling, memory utilization, request latency, and error rates (RED method)",
          score: 2,
        },
        { text: "Monitor screen brightness settings", score: 0 },
        { text: "Check office coffee machine status", score: 1 },
      ],
    },
  ],
  cloud: [
    {
      q: "1. What is the Shared Responsibility Model in cloud computing?",
      options: [
        {
          text: "Cloud provider secures *of* the cloud; customer secures *in* the cloud",
          score: 2,
        },
        { text: "Customer pays for all hardware maintenance", score: 0 },
        { text: "Cloud provider writes application business logic", score: 1 },
      ],
    },
    {
      q: "2. How do you design high availability across multiple cloud data centers?",
      options: [
        {
          text: "Deploy redundant multi-AZ (Availability Zone) architectures with auto-failover",
          score: 2,
        },
        {
          text: "Keep all workloads running in a single data center",
          score: 0,
        },
        { text: "Power down servers at night", score: 1 },
      ],
    },
    {
      q: "3. What is the principle of least privilege in Cloud Identity and Access Management (IAM)?",
      options: [
        {
          text: "Granting users and services only the absolute minimum permissions needed to perform tasks",
          score: 2,
        },
        { text: "Giving admin access to every developer", score: 0 },
        { text: "Disabling all security roles", score: 1 },
      ],
    },
    {
      q: "4. What is the difference between AWS S3 object storage and EBS block storage?",
      options: [
        {
          text: "S3 is scalable internet-accessible object storage; EBS is low-latency block storage attached to EC2",
          score: 2,
        },
        { text: "They are identical storage services", score: 0 },
        { text: "S3 can only be accessed via command line", score: 1 },
      ],
    },
    {
      q: "5. How do you optimize cloud expenditure for idle non-production environments?",
      options: [
        {
          text: "Implement automated scheduling scripts to spin down resources during off-hours",
          score: 2,
        },
        { text: "Leave everything running 24/7", score: 0 },
        { text: "Delete the cloud account monthly", score: 1 },
      ],
    },
    {
      q: "6. What is the purpose of a Content Delivery Network (CDN) like CloudFront or Cloudflare?",
      options: [
        {
          text: "Caches static assets at edge locations globally to reduce latency and origin load",
          score: 2,
        },
        { text: "Hosts relational databases", score: 0 },
        { text: "Compiles serverless functions", score: 1 },
      ],
    },
    {
      q: "7. How do you secure data in transit across cloud VPCs and external networks?",
      options: [
        {
          text: "Enforce TLS 1.3 encryption, VPN tunnels, and encrypted peering connections",
          score: 2,
        },
        { text: "Send all traffic over unencrypted HTTP", score: 0 },
        { text: "Rely solely on perimeter firewalls", score: 1 },
      ],
    },
    {
      q: "8. What is Serverless computing (e.g., AWS Lambda, Google Cloud Functions)?",
      options: [
        {
          text: "Event-driven execution model where infrastructure management is abstracted away",
          score: 2,
        },
        { text: "Running code on personal local laptops", score: 0 },
        { text: "Using computers without hard drives", score: 1 },
      ],
    },
    {
      q: "9. How do you isolate tenant environments within a shared cloud VPC?",
      options: [
        {
          text: "Use private subnets, security groups, Network ACLs, and VPC flow logs",
          score: 2,
        },
        { text: "Put all servers on the public internet", score: 0 },
        { text: "Share root login credentials", score: 1 },
      ],
    },
    {
      q: "10. What is disaster recovery RPO and RTO?",
      options: [
        {
          text: "Recovery Point Objective (acceptable data loss window) and Recovery Time Objective (downtime duration)",
          score: 2,
        },
        { text: "Server reboot speed metrics", score: 0 },
        { text: "Billing cycle deadlines", score: 1 },
      ],
    },
  ],
  sre: [
    {
      q: "1. What is an SLI, SLO, and SLA?",
      options: [
        {
          text: "Indicator (metric), Objective (internal target), Agreement (business contract with penalties)",
          score: 2,
        },
        { text: "They are all identical performance terms", score: 0 },
        { text: "Coding style guidelines", score: 1 },
      ],
    },
    {
      q: "2. How do Error Budgets help balance feature velocity with system reliability?",
      options: [
        {
          text: "Quantifies acceptable unreliability; if budget is exhausted, releases freeze to focus on stability",
          score: 2,
        },
        { text: "Tracks monetary spending on cloud bills", score: 0 },
        { text: "Limits how many bugs developers can log", score: 1 },
      ],
    },
    {
      q: "3. What is the purpose of implementing Chaos Engineering in production?",
      options: [
        {
          text: "Proactively injecting failures to test system resilience and uncover blind spots",
          score: 2,
        },
        { text: "Intentionally crashing user sessions for fun", score: 0 },
        { text: "Skipping automated testing entirely", score: 1 },
      ],
    },
    {
      q: "4. How do you conduct a Blameless Post-Mortem after an outage?",
      options: [
        {
          text: "Focus on systemic and procedural root causes rather than pointing fingers at individuals",
          score: 2,
        },
        { text: "Fire the engineer who made the typo", score: 0 },
        { text: "Pretend the outage never happened", score: 1 },
      ],
    },
    {
      q: "5. What is toil in Site Reliability Engineering?",
      options: [
        {
          text: "Manual, repetitive, operational work devoid of enduring value that scales linearly",
          score: 2,
        },
        { text: "Writing clean automated unit tests", score: 0 },
        { text: "Participating in architectural design reviews", score: 1 },
      ],
    },
    {
      q: "6. How do distributed tracing tools (e.g., Jaeger, OpenTelemetry) assist in debugging?",
      options: [
        {
          text: "Map request journeys across microservice boundaries to pinpoint latency bottlenecks",
          score: 2,
        },
        { text: "Trace the physical location of server racks", score: 0 },
        { text: "Monitor CPU fan speeds", score: 1 },
      ],
    },
    {
      q: "7. What is the difference between metrics, logs, and traces (The Three Pillars of Observability)?",
      options: [
        {
          text: "Metrics are numeric aggregations; logs are discrete events; traces track request paths",
          score: 2,
        },
        { text: "They are three names for text files", score: 0 },
        { text: "Metrics are for frontend; logs are for database", score: 1 },
      ],
    },
    {
      q: "8. How do you handle cascading failures in microservices?",
      options: [
        {
          text: "Implement circuit breakers, timeouts, and bulkhead isolation patterns",
          score: 2,
        },
        { text: "Let all services fail simultaneously", score: 0 },
        { text: "Increase timeout limits to infinite", score: 1 },
      ],
    },
    {
      q: "9. What is canary releasing?",
      options: [
        {
          text: "Routing a small percentage of live traffic to a new version to verify stability before full rollout",
          score: 2,
        },
        { text: "Releasing software only during spring season", score: 0 },
        { text: "Testing code on a pet bird", score: 1 },
      ],
    },
    {
      q: "10. How do you configure effective alerting thresholds to avoid alert fatigue?",
      options: [
        {
          text: "Alert on symptoms (user-facing impact) rather than causes, keeping actionable thresholds high",
          score: 2,
        },
        {
          text: "Send an SMS alert for every single CPU spike or log warning",
          score: 0,
        },
        { text: "Disable all alarms permanently", score: 1 },
      ],
    },
  ],
  database: [
    {
      q: "1. What is the difference between ACID properties in SQL and BASE in NoSQL databases?",
      options: [
        {
          text: "ACID guarantees strict consistency; BASE prioritizes availability and eventual consistency",
          score: 2,
        },
        { text: "ACID is for mobile; BASE is for web", score: 0 },
        { text: "They mean the same thing", score: 1 },
      ],
    },
    {
      q: "2. How do B-Tree indexes speed up query execution?",
      options: [
        {
          text: "Maintain a sorted, balanced tree structure allowing O(log n) lookups instead of full table scans",
          score: 2,
        },
        { text: "Duplicate the entire database table", score: 0 },
        { text: "Encrypt table rows", score: 1 },
      ],
    },
    {
      q: "3. What causes database deadlocks and how do you resolve them?",
      options: [
        {
          text: "Two transactions hold locks the other needs; resolve by setting timeouts and locking in consistent order",
          score: 2,
        },
        { text: "Too many users browsing the website", score: 0 },
        { text: "Restarting the database server", score: 1 },
      ],
    },
    {
      q: "4. What is database normalization and what problem does it solve?",
      options: [
        {
          text: "Structuring relational tables to minimize data redundancy and anomalies",
          score: 2,
        },
        { text: "Combining all tables into one giant CSV file", score: 0 },
        { text: "Encrypting sensitive user passwords", score: 1 },
      ],
    },
    {
      q: "5. How do you scale read-heavy relational databases?",
      options: [
        {
          text: "Implement read replicas alongside a primary write instance",
          score: 2,
        },
        { text: "Add more RAM to the user's browser", score: 0 },
        { text: "Delete old user accounts", score: 1 },
      ],
    },
    {
      q: "6. What is sharding in distributed database systems?",
      options: [
        {
          text: "Horizontally partitioning large datasets across multiple independent database servers",
          score: 2,
        },
        { text: "Breaking tables into smaller columns", score: 0 },
        { text: "Backing up data to tape drives", score: 1 },
      ],
    },
    {
      q: "7. How do you analyze slow-performing SQL queries?",
      options: [
        {
          text: "Examine execution plans using EXPLAIN ANALYZE and inspect missing indexes",
          score: 2,
        },
        { text: "Guess which query is slow and rewrite it randomly", score: 0 },
        { text: "Increase server CPU cores", score: 1 },
      ],
    },
    {
      q: "8. What is the difference between a clustered and non-clustered index?",
      options: [
        {
          text: "Clustered index physically reorders table data rows; non-clustered creates a separate lookup pointer structure",
          score: 2,
        },
        { text: "Clustered is for cloud; non-clustered is local", score: 0 },
        { text: "They are identical indices", score: 1 },
      ],
    },
    {
      q: "9. How do you handle database backup strategies for mission-critical apps?",
      options: [
        {
          text: "Combine daily full backups with continuous point-in-time recovery (PITR) transaction logs",
          score: 2,
        },
        {
          text: "Take a screenshot of the database schema once a year",
          score: 0,
        },
        { text: "Never back up data", score: 1 },
      ],
    },
    {
      q: "10. What is a Write-Ahead Log (WAL) used for in database engines?",
      options: [
        {
          text: "Ensuring atomicity and durability by writing changes to disk log before applying them to data files",
          score: 2,
        },
        { text: "Logging user login timestamps", score: 0 },
        { text: "Tracking database administrator activity", score: 1 },
      ],
    },
  ],
  pentest: [
    {
      q: "1. What is the standard methodology phases of a penetration test?",
      options: [
        {
          text: "Reconnaissance, Scanning, Gaining Access, Maintaining Access, Covering Tracks/Reporting",
          score: 2,
        },
        { text: "Coding, Testing, Deploying, Marketing", score: 0 },
        { text: "Installing antivirus and scanning files", score: 1 },
      ],
    },
    {
      q: "2. How does an SQL Injection (SQLi) vulnerability occur?",
      options: [
        {
          text: "When untrusted user input is directly concatenated into database queries without sanitization/parameterization",
          score: 2,
        },
        { text: "When CSS styles fail to load", score: 0 },
        { text: "When passwords are too short", score: 1 },
      ],
    },
    {
      q: "3. What is the difference between XSS (Cross-Site Scripting) and CSRF (Cross-Site Request Forgery)?",
      options: [
        {
          text: "XSS executes malicious scripts in a victim's browser; CSRF forces an authenticated user to execute unwanted actions",
          score: 2,
        },
        { text: "They are identical web flaws", score: 0 },
        { text: "CSRF only affects mobile devices", score: 1 },
      ],
    },
    {
      q: "4. What is port scanning with Nmap used for during reconnaissance?",
      options: [
        {
          text: "Discovering active hosts, open ports, running services, and OS fingerprinting",
          score: 2,
        },
        { text: "Cracking WPA2 Wi-Fi passwords", score: 0 },
        { text: "Writing exploit payloads", score: 1 },
      ],
    },
    {
      q: "5. What is privilege escalation in cybersecurity?",
      options: [
        {
          text: "Gaining higher-level system permissions (e.g., standard user to root/SYSTEM)",
          score: 2,
        },
        { text: "Upgrading user subscription tiers", score: 0 },
        { text: "Changing password complexity rules", score: 1 },
      ],
    },
    {
      q: "6. How do you identify hidden web directories and files during assessments?",
      options: [
        {
          text: "Use directory enumeration tools like Gobuster or Dirsearch with robust wordlists",
          score: 2,
        },
        { text: "Guess filenames manually in the browser bar", score: 0 },
        { text: "Check the website footer", score: 1 },
      ],
    },
    {
      q: "7. What is the purpose of intercepting proxies like Burp Suite?",
      options: [
        {
          text: "To inspect, modify, and replay HTTP/HTTPS request traffic between client and server",
          score: 2,
        },
        { text: "To speed up internet browsing", score: 0 },
        { text: "To block pop-up ads", score: 1 },
      ],
    },
    {
      q: "8. What is a buffer overflow vulnerability?",
      options: [
        {
          text: "Writing more data to a memory buffer than it can hold, overwriting adjacent memory and instruction pointers",
          score: 2,
        },
        { text: "Running out of RAM while playing video games", score: 0 },
        { text: "A slow database connection pool", score: 1 },
      ],
    },
    {
      q: "9. What is the difference between symmetric and asymmetric encryption?",
      options: [
        {
          text: "Symmetric uses the same key for encryption/decryption; asymmetric uses a public/private key pair",
          score: 2,
        },
        { text: "Symmetric is unbreakable; asymmetric is weak", score: 0 },
        { text: "Asymmetric is only used for audio files", score: 1 },
      ],
    },
    {
      q: "10. What is a Pass-the-Hash attack?",
      options: [
        {
          text: "An attack where an adversary uses an NTLM password hash to authenticate without cracking it to plaintext",
          score: 2,
        },
        { text: "Hashing files to verify integrity", score: 0 },
        { text: "Cracking Wi-Fi handshakes", score: 1 },
      ],
    },
  ],
  security: [
    {
      q: "1. What is Zero Trust architecture?",
      options: [
        {
          text: "A security model requiring continuous verification of every user and device regardless of location",
          score: 2,
        },
        {
          text: "Trusting all employees inside the corporate office network",
          score: 0,
        },
        { text: "Disabling all security controls", score: 1 },
      ],
    },
    {
      q: "2. What is Multi-Factor Authentication (MFA) fatigue (MFA bombing)?",
      options: [
        {
          text: "Bombarding a user with push notifications until they accidentally approve a fraudulent login",
          score: 2,
        },
        { text: "Users getting tired of typing passwords", score: 0 },
        { text: "Batteries dying on hardware security keys", score: 1 },
      ],
    },
    {
      q: "3. How do you implement secure Identity and Access Management (IAM)?",
      options: [
        {
          text: "Enforce RBAC/ABAC, principle of least privilege, and hardware-backed MFA",
          score: 2,
        },
        { text: "Share a single admin password across the team", score: 0 },
        { text: "Allow password reuse", score: 1 },
      ],
    },
    {
      q: "4. What is the purpose of a Security Information and Event Management (SIEM) system?",
      options: [
        {
          text: "Aggregating, analyzing, and correlating log data across systems for threat detection",
          score: 2,
        },
        { text: "Managing employee payroll", score: 0 },
        { text: "Writing secure application code", score: 1 },
      ],
    },
    {
      q: "5. What is Endpoint Detection and Response (EDR)?",
      options: [
        {
          text: "Continuous monitoring and endpoint telemetry collection to detect and mitigate malicious activity",
          score: 2,
        },
        { text: "Installing basic antivirus software from 2005", score: 0 },
        { text: "Fixing broken laptop screens", score: 1 },
      ],
    },
    {
      q: "6. How do you protect sensitive data at rest and in transit?",
      options: [
        {
          text: "AES-256 encryption at rest and TLS 1.3 in transit with robust key management",
          score: 2,
        },
        { text: "Saving files in a hidden desktop folder", score: 0 },
        { text: "Leaving databases unencrypted", score: 1 },
      ],
    },
    {
      q: "7. What is a Public Key Infrastructure (PKI)?",
      options: [
        {
          text: "A framework of policies, hardware, and software for creating, managing, and revoking digital certificates",
          score: 2,
        },
        { text: "A public park with Wi-Fi access", score: 0 },
        { text: "A database of user usernames", score: 1 },
      ],
    },
    {
      q: "8. What is the role of a Web Application Firewall (WAF)?",
      options: [
        {
          text: "Filtering and monitoring HTTP traffic to protect web apps from common exploits like SQLi and XSS",
          score: 2,
        },
        { text: "Stopping physical intruders at data center doors", score: 0 },
        { text: "Blocking spam emails", score: 1 },
      ],
    },
    {
      q: "9. What is social engineering in the context of security?",
      options: [
        {
          text: "Manipulating individuals into divulging confidential information or bypassing security controls",
          score: 2,
        },
        { text: "Building social media applications", score: 0 },
        { text: "Configuring network firewalls", score: 1 },
      ],
    },
    {
      q: "10. What is a Security Operations Center (SOC)?",
      options: [
        {
          text: "A centralized team responsible for monitoring and improving an organization's security posture",
          score: 2,
        },
        {
          text: "A room where software engineers write frontend code",
          score: 0,
        },
        { text: "The marketing department", score: 1 },
      ],
    },
  ],
  appsec: [
    {
      q: "1. What is Static Application Security Testing (SAST)?",
      options: [
        {
          text: "Analyzing source code or binaries for security vulnerabilities without executing the program",
          score: 2,
        },
        {
          text: "Running live penetration tests on a running server",
          score: 0,
        },
        { text: "Checking user interface styling", score: 1 },
      ],
    },
    {
      q: "2. What is Dynamic Application Security Testing (DAST)?",
      options: [
        {
          text: "Black-box testing that evaluates a running application from the outside for security flaws",
          score: 2,
        },
        { text: "Reading code files in a text editor", score: 0 },
        { text: "Analyzing database backup files", score: 1 },
      ],
    },
    {
      q: "3. How do you identify hardcoded secrets in a git repository?",
      options: [
        {
          text: "Use tools like Semgrep, TruffleHog, or GitGuardian in CI/CD pipelines",
          score: 2,
        },
        { text: "Manually read every line of code on GitHub", score: 0 },
        { text: "Ask team members if they wrote passwords", score: 1 },
      ],
    },
    {
      q: "4. What is Software Composition Analysis (SCA)?",
      options: [
        {
          text: "Scanning open-source third-party dependencies and libraries for known vulnerabilities and CVEs",
          score: 2,
        },
        { text: "Writing custom dependency packages", score: 0 },
        { text: "Designing user composition layouts", score: 1 },
      ],
    },
    {
      q: "5. What is input validation and output encoding?",
      options: [
        {
          text: "Input validation ensures data meets expected criteria; output encoding prevents data from being interpreted as code",
          score: 2,
        },
        { text: "Checking if user email is spelled correctly", score: 0 },
        { text: "Compressing image files", score: 1 },
      ],
    },
    {
      q: "6. What does OWASP Top 10 represent?",
      options: [
        {
          text: "A standard awareness document highlighting the ten most critical web application security risks",
          score: 2,
        },
        { text: "The top 10 most popular programming languages", score: 0 },
        { text: "The 10 best tech companies to work for", score: 1 },
      ],
    },
    {
      q: "7. How do you implement secure deserialization practices?",
      options: [
        {
          text: "Avoid untrusted data serialization formats like Python pickle or Java native serialization",
          score: 2,
        },
        { text: "Serialize all data into plain text strings", score: 0 },
        { text: "Disable data storage entirely", score: 1 },
      ],
    },
    {
      q: "8. What is the role of Content Security Policy (CSP) headers?",
      options: [
        {
          text: "Mitigate XSS attacks by restricting domains from which scripts can be loaded and executed",
          score: 2,
        },
        { text: "Speed up website load times", score: 0 },
        { text: "Control database connection pools", score: 1 },
      ],
    },
    {
      q: "9. What is Secure Software Development Lifecycle (SSDLC)?",
      options: [
        {
          text: "Integrating security tasks and testing into every phase of the software development lifecycle",
          score: 2,
        },
        {
          text: "Writing security policies after an app is launched",
          score: 0,
        },
        { text: "Only hiring senior security engineers", score: 1 },
      ],
    },
    {
      q: "10. How do you handle vulnerability disclosure programs (Bug Bounties)?",
      options: [
        {
          text: "Provide clear security.txt policies, safe harbor guidelines, and structured triage workflows",
          score: 2,
        },
        { text: "Ignore security emails from external researchers", score: 0 },
        { text: "Threaten researchers with legal action", score: 1 },
      ],
    },
  ],
  forensics: [
    {
      q: "1. What is the Golden Rule of Digital Forensics?",
      options: [
        {
          text: "Never alter or tamper with original evidence; always work on forensic bitstream images/copies",
          score: 2,
        },
        { text: "Delete suspect files immediately", score: 0 },
        { text: "Reformat hard drives before analysis", score: 1 },
      ],
    },
    {
      q: "2. What is volatile memory (RAM) acquisition used for in incident response?",
      options: [
        {
          text: "Capturing running processes, network connections, encryption keys, and injected code payloads",
          score: 2,
        },
        { text: "Recovering deleted files from hard disk platters", score: 0 },
        { text: "Checking monitor resolution settings", score: 1 },
      ],
    },
    {
      q: "3. What is chain of custody?",
      options: [
        {
          text: "A chronological documentation paper trail showing the seizure, custody, and transfer of evidence",
          score: 2,
        },
        { text: "A blockchain cryptocurrency transaction history", score: 0 },
        { text: "A list of software dependencies", score: 1 },
      ],
    },
    {
      q: "4. How do you analyze timeline artifacts on a Windows machine?",
      options: [
        {
          text: "Examine MFT (Master File Table), registry hives, event logs, and USN journals",
          score: 2,
        },
        { text: "Count how many files are on the desktop", score: 0 },
        { text: "Check the computer clock battery", score: 1 },
      ],
    },
    {
      q: "5. What is steganography detection?",
      options: [
        {
          text: "Uncovering hidden data or messages concealed within ordinary carrier files like images or audio",
          score: 2,
        },
        { text: "Encrypting text files with passwords", score: 0 },
        { text: "Compressing zip archives", score: 1 },
      ],
    },
    {
      q: "6. What is malware static analysis?",
      options: [
        {
          text: "Inspecting malware binaries, strings, headers, and disassembled code without running it",
          score: 2,
        },
        {
          text: "Running malware on a production server to see what happens",
          score: 0,
        },
        { text: "Scanning files with Windows Defender", score: 1 },
      ],
    },
    {
      q: "7. What is malware dynamic (behavioral) analysis?",
      options: [
        {
          text: "Executing malware in a secure sandbox environment to observe network calls, registry changes, and file drops",
          score: 2,
        },
        { text: "Reading the source code in a text editor", score: 0 },
        { text: "Decompiling Python bytecode", score: 1 },
      ],
    },
    {
      q: "8. How do you investigate network packet captures (PCAP) using Wireshark?",
      options: [
        {
          text: "Filter streams by protocols, inspect TCP handshakes, follow streams, and look for exfiltration",
          score: 2,
        },
        { text: "Measure Wi-Fi signal strength in the office", score: 0 },
        { text: "Check router hardware warranties", score: 1 },
      ],
    },
    {
      q: "9. What is file carving?",
      options: [
        {
          text: "Recovering files from unallocated disk space based on file headers and footers without filesystem metadata",
          score: 2,
        },
        { text: "Sculpting statues out of old circuit boards", score: 0 },
        { text: "Trimming video files", score: 1 },
      ],
    },
    {
      q: "10. What is a Memory Dump analysis tool used for?",
      options: [
        {
          text: "Tools like Volatility to extract forensic artifacts from RAM dumps",
          score: 2,
        },
        { text: "Clearing browser cache history", score: 0 },
        { text: "Upgrading computer RAM sticks", score: 1 },
      ],
    },
  ],
  dataeng: [
    {
      q: "1. What is an ETL vs. ELT data pipeline architecture?",
      options: [
        {
          text: "ETL transforms data before loading into target warehouse; ELT loads raw data first and transforms inside warehouse",
          score: 2,
        },
        { text: "They are completely identical workflows", score: 0 },
        { text: "ETL is for mobile apps; ELT is for games", score: 1 },
      ],
    },
    {
      q: "2. What is the role of orchestration tools like Apache Airflow or Prefect?",
      options: [
        {
          text: "Defining, scheduling, monitoring, and managing complex dependency workflows for data pipelines",
          score: 2,
        },
        { text: "Playing background music during data queries", score: 0 },
        { text: "Writing SQL join statements automatically", score: 1 },
      ],
    },
    {
      q: "3. What is the difference between row-oriented and column-oriented data stores?",
      options: [
        {
          text: "Row stores (OLTP) optimize transactional writes; column stores (OLAP) optimize analytical aggregation queries",
          score: 2,
        },
        { text: "Column stores only save data vertically", score: 0 },
        { text: "They have identical performance characteristics", score: 1 },
      ],
    },
    {
      q: "4. How do you handle schema evolution in data lakes and streaming pipelines?",
      options: [
        {
          text: "Use schema registries, Delta Lake, or Apache Iceberg table formats to manage backward/forward compatibility",
          score: 2,
        },
        { text: "Delete the data lake every time a column changes", score: 0 },
        { text: "Throw errors on every new data field", score: 1 },
      ],
    },
    {
      q: "5. What is data partitioning and bucketing in big data frameworks (e.g., Spark, Hive)?",
      options: [
        {
          text: "Splitting data into sub-directories based on partition keys to minimize data scan sizes during queries",
          score: 2,
        },
        { text: "Storing data in physical plastic buckets", score: 0 },
        { text: "Encrypting database tables", score: 1 },
      ],
    },
    {
      q: "6. What is the purpose of Apache Kafka in streaming data architectures?",
      options: [
        {
          text: "A distributed event streaming platform handling high-throughput real-time data feeds reliably",
          score: 2,
        },
        { text: "A relational database management system", score: 0 },
        { text: "A static file hosting server", score: 1 },
      ],
    },
    {
      q: "7. How do you ensure data quality and anomaly detection in pipelines?",
      options: [
        {
          text: "Implement data contracts, validation checks (e.g., Great Expectations), and automated alerting",
          score: 2,
        },
        {
          text: "Hope that data arriving from external APIs is always correct",
          score: 0,
        },
        { text: "Manually inspect CSV files in Excel daily", score: 1 },
      ],
    },
    {
      q: "8. What is data deduplication?",
      options: [
        {
          text: "Identifying and eliminating redundant identical records to save storage and ensure clean analytics",
          score: 2,
        },
        { text: "Backing up data twice", score: 0 },
        { text: "Deleting all old databases", score: 1 },
      ],
    },
    {
      q: "9. How do you optimize slow analytical SQL queries in Snowflake or BigQuery?",
      options: [
        {
          text: "Prune partitions, avoid SELECT *, cluster tables on frequently filtered keys, and cache results",
          score: 2,
        },
        { text: "Add more indexes like a traditional SQL database", score: 0 },
        { text: "Upgrade your laptop internet connection", score: 1 },
      ],
    },
    {
      q: "10. What is a data warehouse star schema?",
      options: [
        {
          text: "A dimensional modeling structure consisting of a central fact table surrounded by dimension tables",
          score: 2,
        },
        { text: "A constellation map used by data scientists", score: 0 },
        { text: "A network topology diagram", score: 1 },
      ],
    },
  ],
  datascience: [
    {
      q: "1. What is the difference between L1 (Lasso) and L2 (Ridge) regularization in machine learning?",
      options: [
        {
          text: "L1 adds absolute penalty (drives coefficients to zero / feature selection); L2 adds squared penalty (shrinks coefficients)",
          score: 2,
        },
        { text: "They are identical mathematical formulas", score: 0 },
        { text: "L1 is for classification; L2 is for design", score: 1 },
      ],
    },
    {
      q: "2. How do you handle severe class imbalance in a classification dataset?",
      options: [
        {
          text: "Use resampling techniques (SMOTE, undersampling), adjust class weights, or evaluate F1/AUC-ROC instead of accuracy",
          score: 2,
        },
        { text: "Delete the minority class data", score: 0 },
        { text: "Train the model with random guessing", score: 1 },
      ],
    },
    {
      q: "3. What is overfitting and how do you prevent it?",
      options: [
        {
          text: "Model learns training noise instead of general patterns; prevent using cross-validation, dropout, and regularization",
          score: 2,
        },
        { text: "Model is too simple to solve the problem", score: 0 },
        { text: "Model runs too fast on GPUs", score: 1 },
      ],
    },
    {
      q: "4. What is the curse of dimensionality?",
      options: [
        {
          text: "Phenomena where data sparsity increases exponentially with dimensions, degrading distance-based algorithm performance",
          score: 2,
        },
        { text: "Having too many monitors on your desk", score: 0 },
        { text: "Running out of storage space on hard drives", score: 1 },
      ],
    },
    {
      q: "5. What is the difference between Precision and Recall?",
      options: [
        {
          text: "Precision is ratio of true positives among predicted positives; Recall is ratio of true positives among actual positives",
          score: 2,
        },
        { text: "They mean the exact same metric", score: 0 },
        { text: "Precision is for speed; recall is for memory", score: 1 },
      ],
    },
    {
      q: "6. How do you test for statistical significance in A/B testing?",
      options: [
        {
          text: "Use hypothesis testing (t-tests, chi-square, p-values, confidence intervals)",
          score: 2,
        },
        {
          text: "Pick the variant that looks better to your manager",
          score: 0,
        },
        { text: "Flip a coin to decide the winner", score: 1 },
      ],
    },
    {
      q: "7. What is Principal Component Analysis (PCA) used for?",
      options: [
        {
          text: "Dimensionality reduction by transforming correlated variables into linearly uncorrelated principal components",
          score: 2,
        },
        { text: "Cleaning missing values in pandas DataFrames", score: 0 },
        { text: "Drawing charts and graphs", score: 1 },
      ],
    },
    {
      q: "8. How do you handle missing data in a feature dataset?",
      options: [
        {
          text: "Impute values using statistical methods (mean, median, KNN) or drop rows if missingness is random and small",
          score: 2,
        },
        { text: "Crash the python script immediately", score: 0 },
        { text: "Fill all missing fields with the number 9999", score: 1 },
      ],
    },
    {
      q: "9. What is the purpose of cross-validation in model training?",
      options: [
        {
          text: "Partitioning data into folds to evaluate model generalization and prevent data leakage/overfitting bias",
          score: 2,
        },
        { text: "Comparing two different programming languages", score: 0 },
        { text: "Translating code into different formats", score: 1 },
      ],
    },
    {
      q: "10. What is feature engineering?",
      options: [
        {
          text: "Transforming raw data into informative variables using domain knowledge to improve model predictive power",
          score: 2,
        },
        { text: "Writing code comments for software features", score: 0 },
        { text: "Designing user interfaces", score: 1 },
      ],
    },
  ],
  aiml: [
    {
      q: "1. What is the attention mechanism in Transformer neural networks?",
      options: [
        {
          text: "Allows models to dynamically weigh the importance of different tokens in a sequence regardless of distance",
          score: 2,
        },
        {
          text: "Forces the model to pay attention during long training hours",
          score: 0,
        },
        { text: "A debugging tool for GPU memory", score: 1 },
      ],
    },
    {
      q: "2. What is RAG (Retrieval-Augmented Generation) in LLM applications?",
      options: [
        {
          text: "Combining vector search over external knowledge bases with LLM text generation to ground responses and reduce hallucinations",
          score: 2,
        },
        {
          text: "Training a brand new LLM from scratch on local GPUs",
          score: 0,
        },
        { text: "A data compression algorithm", score: 1 },
      ],
    },
    {
      q: "3. What is the difference between Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF)?",
      options: [
        {
          text: "SFT trains models on prompt-response pairs; RLHF aligns model outputs using reward models based on human preferences",
          score: 2,
        },
        { text: "They are identical training steps", score: 0 },
        { text: "RLHF is only used for image generation", score: 1 },
      ],
    },
    {
      q: "4. What is model quantization (e.g., INT4, INT8)?",
      options: [
        {
          text: "Reducing model weight precision from FP32/FP16 to lower-bit integers to decrease VRAM usage and speed up inference",
          score: 2,
        },
        { text: "Quantifying how many lines of code a model wrote", score: 0 },
        { text: "Compressing dataset CSV files", score: 1 },
      ],
    },
    {
      q: "5. What is the purpose of vector embeddings and vector databases (e.g., Pinecone, pgvector)?",
      options: [
        {
          text: "Representing semantic data as high-dimensional numerical vectors for fast similarity search",
          score: 2,
        },
        { text: "Storing relational database user profiles", score: 0 },
        { text: "Rendering 3D video game graphics", score: 1 },
      ],
    },
    {
      q: "6. What is LoRA (Low-Rank Adaptation) used for?",
      options: [
        {
          text: "Efficient parameter-tuning method that freezes base model weights and trains low-rank adapter matrices",
          score: 2,
        },
        { text: "Low-resolution image processing", score: 0 },
        { text: "Speed up internet download speeds", score: 1 },
      ],
    },
    {
      q: "7. How do you mitigate prompt injection vulnerabilities in LLM applications?",
      options: [
        {
          text: "Implement strict system prompts, guardrail classifiers, and input/output sanitization filters",
          score: 2,
        },
        {
          text: "Trust that users will never type malicious prompts",
          score: 0,
        },
        { text: "Turn off the AI model when not in use", score: 1 },
      ],
    },
    {
      q: "8. What is the vanishing gradient problem in deep neural networks?",
      options: [
        {
          text: "Gradients become exponentially small during backpropagation in deep layers, stopping weight updates",
          score: 2,
        },
        { text: "Loss of phone battery during AI training", score: 0 },
        { text: "Data disappearing from databases", score: 1 },
      ],
    },
    {
      q: "9. What is tokenization in Natural Language Processing?",
      options: [
        {
          text: "Breaking raw text strings down into smaller sub-word tokens that models can process numerically",
          score: 2,
        },
        { text: "Issuing cryptocurrency tokens for AI models", score: 0 },
        { text: "Generating password tokens", score: 1 },
      ],
    },
    {
      q: "10. What is computer vision Convolutional Neural Network (CNN) feature extraction?",
      options: [
        {
          text: "Using kernel filters to automatically detect spatial hierarchies, edges, textures, and patterns in images",
          score: 2,
        },
        { text: "Extracting text from PDF documents", score: 0 },
        { text: "Converting video files to MP4 format", score: 1 },
      ],
    },
  ],
  design: [
    {
      q: "1. What is the primary purpose of building a comprehensive Design System?",
      options: [
        {
          text: "To maintain visual consistency and accelerate component engineering handoff",
          score: 2,
        },
        { text: "To make mockups look colorful", score: 0 },
        { text: "To replace backend developers", score: 1 },
      ],
    },
    {
      q: "2. How do you approach designing accessible interfaces for visually impaired users?",
      options: [
        {
          text: "Adhere to WCAG color contrast ratios and ensure correct screen reader hierarchy",
          score: 2,
        },
        { text: "Add bright neon colors everywhere", score: 0 },
        { text: "Make all fonts size 8pt", score: 1 },
      ],
    },
    {
      q: "3. What is the difference between UX research and UI visual styling?",
      options: [
        {
          text: "UX focuses on user behavior, workflows, and pain points; UI focuses on aesthetic presentation",
          score: 2,
        },
        { text: "They mean the exact same thing", score: 0 },
        { text: "UI comes before any user data collection", score: 1 },
      ],
    },
    {
      q: "4. How do you structure auto-layout grids in Figma for responsive breakpoint scaling?",
      options: [
        {
          text: "Use nested auto-layout frames with percentage-based constraints and wrapping enabled",
          score: 2,
        },
        { text: "Manually drag boxes around for every screen size", score: 0 },
        { text: "Flatten layers into static images", score: 1 },
      ],
    },
    {
      q: "5. What is an interactive user journey map used for?",
      options: [
        {
          text: "To visualize user steps, thoughts, and emotional states across an experience lifecycle",
          score: 2,
        },
        { text: "To draw application logos", score: 0 },
        { text: "To write JavaScript code snippets", score: 1 },
      ],
    },
    {
      q: "6. How do you conduct effective usability testing on an early-stage prototype?",
      options: [
        {
          text: "Give users task-based scenarios without leading questions and observe behavior",
          score: 2,
        },
        { text: "Tell the user exactly which buttons to click", score: 0 },
        { text: "Ask friends if they like the colors", score: 1 },
      ],
    },
    {
      q: "7. What is the significance of whitespace (negative space) in digital UI design?",
      options: [
        {
          text: "Improves legibility, creates visual hierarchy, and reduces cognitive load",
          score: 2,
        },
        { text: "It is wasted screen space that should be filled", score: 0 },
        { text: "It increases file size", score: 1 },
      ],
    },
    {
      q: "8. How do you handle typography scale systems across mobile and desktop viewports?",
      options: [
        {
          text: "Use modular typographic scales with fluid clamp typography or breakpoint tokens",
          score: 2,
        },
        { text: "Pick random font sizes for each paragraph", score: 0 },
        { text: "Use only one font size everywhere", score: 1 },
      ],
    },
    {
      q: "9. What is the benefit of micro-interactions in modern interfaces?",
      options: [
        {
          text: "Provide subtle feedback, confirm actions, and guide user attention smoothly",
          score: 2,
        },
        { text: "Slow down application loading speeds", score: 0 },
        { text: "Distract users from errors", score: 1 },
      ],
    },
    {
      q: "10. How do you collaborate effectively with developers during design handoff?",
      options: [
        {
          text: "Provide annotated specs, token variables, interactive states, and edge-case variants",
          score: 2,
        },
        { text: "Send a single flat PNG image via email", score: 0 },
        { text: "Let developers guess the padding values", score: 1 },
      ],
    },
  ],
  brand: [
    {
      q: "1. What is the core function of a brand's visual identity system?",
      options: [
        {
          text: "To create instant brand recognition, emotional resonance, and consistent storytelling across touchpoints",
          score: 2,
        },
        { text: "To make logos as complex as possible", score: 0 },
        { text: "To copy competitor color palettes", score: 1 },
      ],
    },
    {
      q: "2. How do you ensure brand asset scalability across tiny favicons and massive billboard displays?",
      options: [
        {
          text: "Design vector-based responsive marks with simplified alternate lockups for small scales",
          score: 2,
        },
        { text: "Use raster JPEG images scaled up to 500%", score: 0 },
        { text: "Never display logos on mobile screens", score: 1 },
      ],
    },
    {
      q: "3. What is the difference between CMYK and RGB color gamuts in design?",
      options: [
        {
          text: "RGB is additive for digital screens; CMYK is subtractive for physical print production",
          score: 2,
        },
        { text: "They are identical color modes", score: 0 },
        { text: "CMYK is only used for mobile apps", score: 1 },
      ],
    },
    {
      q: "4. What is typographic hierarchy and why is it vital for brand perception?",
      options: [
        {
          text: "Guides user eye movement through contrast, weight, and scale to establish importance and readability",
          score: 2,
        },
        { text: "Using a random font for every single sentence", score: 0 },
        { text: "Making all text the exact same size", score: 1 },
      ],
    },
    {
      q: "5. What is a brand guideline (brand book) used for?",
      options: [
        {
          text: "Defining rules for logo usage, color codes, typography, tone of voice, and imagery style",
          score: 2,
        },
        { text: "A list of employee phone numbers", score: 0 },
        { text: "Source code documentation for developers", score: 1 },
      ],
    },
    {
      q: "6. How do you approach designing custom iconography that aligns with brand personality?",
      options: [
        {
          text: "Maintain consistent stroke weight, grid alignment, corner radii, and metaphor styles",
          score: 2,
        },
        {
          text: "Download random icons from 50 different free websites",
          score: 0,
        },
        { text: "Draw random shapes without grids", score: 1 },
      ],
    },
    {
      q: "7. What is the psychological impact of color theory in branding?",
      options: [
        {
          text: "Colors evoke specific emotional responses (e.g., blue for trust, green for wealth/growth)",
          score: 2,
        },
        { text: "Colors have zero psychological effect on humans", score: 0 },
        { text: "Colors only affect file size", score: 1 },
      ],
    },
    {
      q: "8. How do you manage vector vs. raster graphics in brand collateral?",
      options: [
        {
          text: "Use vectors (SVG, AI) for logos and icons to ensure infinite scalability without pixelation",
          score: 2,
        },
        { text: "Use low-res GIFs for everything", score: 0 },
        { text: "Convert all brand assets to text files", score: 1 },
      ],
    },
    {
      q: "9. What is negative space utilization in logo design?",
      options: [
        {
          text: "Cleverly using background empty space to form secondary hidden imagery or shapes",
          score: 2,
        },
        {
          text: "Leaving unnecessary blank space around a blurry photo",
          score: 0,
        },
        { text: "Erasing parts of a logo randomly", score: 1 },
      ],
    },
    {
      q: "10. How do you test brand asset versatility in modern digital environments?",
      options: [
        {
          text: "Test legibility in dark mode, light mode, grayscale, and tiny avatar sizes",
          score: 2,
        },
        { text: "Print out 10,000 posters in black and white", score: 0 },
        { text: "Look at the logo once on a broken monitor", score: 1 },
      ],
    },
  ],
  product: [
    {
      q: "1. What is the purpose of an MVP (Minimum Viable Product)?",
      options: [
        {
          text: "To test core hypotheses and gather validated learning from real users with minimal effort",
          score: 2,
        },
        {
          text: "To build a massive 5-year software project before showing anyone",
          score: 0,
        },
        { text: "To release buggy code on purpose", score: 1 },
      ],
    },
    {
      q: "2. How do you prioritize feature backlogs (e.g., using RICE or MoSCoW frameworks)?",
      options: [
        {
          text: "Evaluate based on Reach, Impact, Confidence, Effort, or Must/Should/Could/Won't criteria",
          score: 2,
        },
        {
          text: "Build whatever feature the loudest client asks for first",
          score: 0,
        },
        { text: "Pick features randomly out of a hat", score: 1 },
      ],
    },
    {
      q: "3. What is a Product Requirement Document (PRD) used for?",
      options: [
        {
          text: "Outlining problem statements, user flows, success metrics, and functional specs for engineering teams",
          score: 2,
        },
        { text: "A marketing budget spreadsheet", score: 0 },
        { text: "Writing CSS styling rules", score: 1 },
      ],
    },
    {
      q: "4. How do you measure product-market fit (PMF)?",
      options: [
        {
          text: "High user retention curves, organic growth loops, and high disappointment if product disappeared (Sean Ellis test)",
          score: 2,
        },
        { text: "Having 10 followers on Twitter", score: 0 },
        { text: "Writing a long press release", score: 1 },
      ],
    },
    {
      q: "5. What is the difference between qualitative and quantitative user research?",
      options: [
        {
          text: "Qualitative explains the 'why' through interviews/observation; quantitative explains the 'what' through metrics/analytics",
          score: 2,
        },
        { text: "They mean the exact same research method", score: 0 },
        {
          text: "Quantitative is for design; qualitative is for database",
          score: 1,
        },
      ],
    },
    {
      q: "6. How do you handle scope creep during an active product sprint?",
      options: [
        {
          text: "Evaluate requests against product roadmap goals; defer scope additions to future sprints via change requests",
          score: 2,
        },
        {
          text: "Say yes to every single random request from stakeholders",
          score: 0,
        },
        { text: "Shut down the development team", score: 1 },
      ],
    },
    {
      q: "7. What is user churn rate and why is it critical?",
      options: [
        {
          text: "Percentage of users who stop using your product over a given timeframe; dictates long-term viability",
          score: 2,
        },
        { text: "Number of new sign-ups per day", score: 0 },
        { text: "Server CPU utilization metric", score: 1 },
      ],
    },
    {
      q: "8. How do you run effective customer discovery interviews?",
      options: [
        {
          text: "Ask about past behaviors and actual pain points rather than hypothetical future preferences",
          score: 2,
        },
        {
          text: "Pitch your product idea immediately and ask if they love it",
          score: 0,
        },
        { text: "Tell users what features they need", score: 1 },
      ],
    },
    {
      q: "9. What is Agile sprint retrospective used for?",
      options: [
        {
          text: "Team reflection on what went well, what didn't, and actionable process improvements for next sprint",
          score: 2,
        },
        { text: "Firing underperforming developers", score: 0 },
        { text: "Planning company vacation days", score: 1 },
      ],
    },
    {
      q: "10. How do you define product OKRs (Objectives and Key Results)?",
      options: [
        {
          text: "Set qualitative inspiring objectives paired with measurable quantitative key results",
          score: 2,
        },
        { text: "List random tasks for engineers to check off", score: 0 },
        { text: "Estimate monthly office snack budgets", score: 1 },
      ],
    },
  ],
  techwriter: [
    {
      q: "1. What is the primary goal of great API documentation?",
      options: [
        {
          text: "Reducing time-to-first-hello (TTFH) with clear code snippets, auth guides, and accurate endpoint specs",
          score: 2,
        },
        { text: "Writing as many pages of text as possible", score: 0 },
        { text: "Hiding error codes from developers", score: 1 },
      ],
    },
    {
      q: "2. What is OpenAPI / Swagger specification used for?",
      options: [
        {
          text: "Describing RESTful APIs in standard machine-readable JSON/YAML for automated docs and SDK generation",
          score: 2,
        },
        { text: "Writing frontend CSS stylesheets", score: 0 },
        { text: "Managing database migration backups", score: 1 },
      ],
    },
    {
      q: "3. What is Markdown and why is it the industry standard for documentation?",
      options: [
        {
          text: "A lightweight markup language with plain-text formatting syntax easily converted to HTML",
          score: 2,
        },
        { text: "A complex graphic design software", score: 0 },
        { text: "A proprietary Microsoft Word file format", score: 1 },
      ],
    },
    {
      q: "4. How do you structure a comprehensive technical tutorial or guide?",
      options: [
        {
          text: "Prerequisites, step-by-step instructions with code blocks, expected output, and troubleshooting",
          score: 2,
        },
        { text: "A single long paragraph with no formatting", score: 0 },
        {
          text: "Only showing the final result without instructions",
          score: 1,
        },
      ],
    },
    {
      q: "5. What is Diátaxis framework for technical documentation?",
      options: [
        {
          text: "A systematic approach dividing docs into tutorials, how-to guides, reference, and explanation",
          score: 2,
        },
        { text: "A spell-checking software extension", score: 0 },
        { text: "A database indexing method", score: 1 },
      ],
    },
    {
      q: "6. How do you maintain documentation accuracy alongside fast-moving engineering codebases?",
      options: [
        {
          text: "Integrate doc generation into CI/CD pipelines, treat docs as code, and require doc updates in PRs",
          score: 2,
        },
        {
          text: "Write the documentation once and never touch it again",
          score: 0,
        },
        { text: "Let users guess when APIs change", score: 1 },
      ],
    },
    {
      q: "7. What is information architecture in documentation portals?",
      options: [
        {
          text: "Structuring, organizing, and labeling content logically so users can find answers instantly",
          score: 2,
        },
        { text: "Designing company logos and color palettes", score: 0 },
        { text: "Configuring cloud server networking", score: 1 },
      ],
    },
    {
      q: "8. How do you write effective error messages for developers?",
      options: [
        {
          text: "Explain what went wrong, why it happened, and provide clear actionable steps to resolve it",
          score: 2,
        },
        { text: "Show generic 'Error 404' with no context", score: 0 },
        { text: "Blame the user for typing incorrectly", score: 1 },
      ],
    },
    {
      q: "9. What is semantic versioning (SemVer) in technical changelogs?",
      options: [
        {
          text: "Major.Minor.Patch version numbering system indicating breaking changes vs. bug fixes",
          score: 2,
        },
        { text: "Naming releases after animal species", score: 0 },
        { text: "Random version numbers chosen monthly", score: 1 },
      ],
    },
    {
      q: "10. How do you test whether your technical documentation is actually clear?",
      options: [
        {
          text: "Conduct documentation usability testing by having developers follow guides blind",
          score: 2,
        },
        {
          text: "Read it yourself and assume everyone will understand it",
          score: 0,
        },
        { text: "Check if the file size is under 1MB", score: 1 },
      ],
    },
  ],
};

function setupQuiz(selectedCategory) {
  const categoryNames = {
    web: "Web Engineering Trial",
    mobile: "Mobile Engineering Trial",
    design: "UI/UX Design Trial",
  };
  document.getElementById("trialClassBadge").innerText =
    categoryNames[selectedCategory];

  const container = document.getElementById("questionsList");
  container.innerHTML = "";

  const questions = questionBanks[selectedCategory];
  questions.forEach((item, index) => {
    let optionsHtml = item.options
      .map(
        (opt, optIdx) => `
                    <label class="flex items-center gap-2 cursor-pointer text-xs text-gray-300 hover:text-white">
                        <input type="radio" name="q_${index}" value="${opt.score}" class="accent-[#d4af37]" required> 
                        ${opt.text}
                    </label>
                `,
      )
      .join("");

    container.innerHTML += `
                    <div class="bg-[#161b22] p-4 rounded-xl border border-[#30363d] space-y-2 text-left">
                        <p class="text-xs md:text-sm font-semibold text-white">${item.q}</p>
                        <div class="space-y-1.5 pl-2">${optionsHtml}</div>
                    </div>
                `;
  });
}

function evaluateQuiz() {
  const questions = questionBanks[jobClass];
  let totalScore = 0;

  for (let i = 0; i < questions.length; i++) {
    const answered = document.querySelector(`input[name="q_${i}"]:checked`);
    if (!answered) {
      alert(`Please answer question #${i + 1} before submitting your trial.`);
      return;
    }
    totalScore += parseInt(answered.value);
  }

  let rank = "F";
  let title = "Novice Adventurer";

  if (totalScore >= 15) {
    rank = "C";
    title = "Skilled Contributor";
  } else if (totalScore >= 12) {
    rank = "D";
    title = "Journeyman Adventurer";
  } else {
    rank = "E";
    title = "Apprentice Adventurer";
  }

  document.getElementById("quizContainer").style.display = "none";
  const successBox = document.getElementById("successState");
  successBox.classList.remove("hidden");

  //document.getElementById("confirmedUser").innerText = userName;
  document.getElementById("assignedRank").innerText = rank;
  document.getElementById("rankTitle").innerText = title;
  globalRank = rank;
  globalTitle = title;
}
// sharing
let globalRank = "";
let globalTitle = "";
const imageUrl =
  "https://oewdlfdzlxjahjlcekvt.supabase.co/storage/v1/object/public/image/guild_2.jpeg";

// Inside your evaluateQuiz() function, make sure you save them to the global variables:
// globalRank = rank;
// globalTitle = title;
// document.getElementById('cardUser').innerText = userName;

function getShareContent() {
  return `I just took the technical trial on The Guild and earned a ${globalRank}-Rank (${globalTitle})! Think you have what it takes to join the elite freelance network? Take the trial here:`;
}

function shareToX() {
  const text = encodeURIComponent(
    getShareContent() + " " + window.location.href,
  );
  window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
}

function shareToLinkedIn() {
  const url = encodeURIComponent(window.location.href + " " + imageUrl);
  const title = encodeURIComponent(`Earned ${globalRank}-Rank on The Guild!`);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    "_blank",
  );
}

function shareToFacebook() {
  const url = encodeURIComponent(window.location.href + " " + imageUrl);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function copyShareText() {
  const textToCopy = `${getShareContent()} ${window.location.href}`;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert(
      "Rank card text copied to clipboard! Ready to paste on TikTok, Instagram, or anywhere else.",
    );
  });
}

function toggleSkillsDropdown() {
  const menu = document.getElementById("skillsDropdownMenu");
  menu.classList.toggle("hidden");
}

document.addEventListener("change", (event) => {
  if (!event.target.classList.contains("skill-checkbox")) {
    return;
  }

  updateSelectedSkills();
});

function updateSelectedSkills() {
  const checkboxes = document.querySelectorAll(".skill-checkbox:checked");

  const skills = Array.from(checkboxes).map((checkbox) => checkbox.value);

  const labels = Array.from(checkboxes).map(
    (checkbox) => checkbox.parentElement.querySelector("span").textContent,
  );

  document.getElementById("regSkills").value = skills.join(",");

  const display = document.getElementById("selectedSkillsText");

  if (labels.length === 0) {
    display.textContent = "Select your skills...";
    display.classList.add("text-gray-400");
    display.classList.remove("text-white");
  } else {
    display.textContent = labels.join(", ");
    display.classList.remove("text-gray-400");
    display.classList.add("text-white");
  }
  console.log("display: ", display);
  selectedSkills = skills;
  console.log("skills: ", selectedSkills);
}

async function signup() {
  // name, email, role, job_class, skills
  userName = document.getElementById("regUsername").value.trim();
  selectedCategory = document.getElementById("regClass").value.trim();

  const payload = {
    name: "",
    email: "",
    role: "adventurer",
    job_class: "",
    skills: selectedSkills,
  };

  try {
    // Show loading state or disable button here if desired

    // Make the fetch request to your FastAPI backend
    const response = await fetch("http://localhost:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Enlistment failed on the server.");
    }

    console.log("Server response:", result);

    // 1. Hide Phase 1 form container
    document.getElementById("step1FormContainer").style.display = "none";

    // 2. Reveal Loading Portal animation screen
    document.getElementById("loadingContainer").classList.remove("hidden");

    // 3. Wait 5 seconds, then transition to the dynamic quiz trial
    setTimeout(() => {
      document.getElementById("loadingContainer").style.display = "none";
      setupQuiz(); // Dynamically generates the 10-question trial based on `selectedCategory`
      document.getElementById("quizContainer").classList.remove("hidden");
    }, 5000);
  } catch (error) {
    console.error("Connection Error:", error);
    alert("Failed to connect to The Guild server: " + error.message);
  }
}

async function handleInitialSubmit(e) {
  e.preventDefault();
  userName = document.getElementById("regUsername").value.trim();
  email = document.getElementById("regEmail").value.trim();
  jobClass = document.getElementById("regClass").value.trim();
  password = document.getElementById("regPassword").value.trim();
  console.log("submitted skills: ", selectedSkills);

  if (!userName || !email || !jobClass || !password) {
    alert("Please complete all fields.");
    return;
  }

  if (password.length < 8) {
    alert("Your password must be at least 8 characters.");
    return;
  }

  sessionStorage.setItem(
    "guild_signup",
    JSON.stringify({
      userName,
      email,
      jobClass,
      selectedSkills,
    }),
  );

  const redirectUrl = `${window.location.origin}${window.location.pathname}`;

  const payload = {
    full_name: userName,
    email: email,
    role: "adventurer",
    job_class: jobClass,
    skills: selectedSkills,
    rank: "F",
    password: password,
    redirectUrl: redirectUrl,
  };
  console.log("payload => ", payload);

  try {
    const response = await fetch(
      "https://theguildbackend.onrender.com/auth/trial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.detail || "Enlistment failed on the server.");
    }

    console.log("Server response:", result);

    /*
     * Email confirmation is enabled.
     *
     * The user exists, but there is no active session yet.
     */
    if (!result.session) {
      showEmailVerificationMessage(email);
      return;
    }

    /*
     * We have an authenticated session.
     *
     * Save the access token if FastAPI requires it
     * for subsequent authenticated requests.
     */
    if (result.session.access_token) {
      sessionStorage.setItem("guild_access_token", result.session.access_token);
    }

    /*
     * Continue directly to the trial.
     */
    await continueToTrial(result.user);
  } catch (error) {
    console.error("Connection Error:", error);
    alert("Failed to connect to The Guild server: " + "User already Exist");
  }
}

function showEmailVerificationMessage(email) {
  document.getElementById("step1FormContainer").classList.add("hidden");

  document.getElementById("verificationContainer").classList.remove("hidden");

  document.getElementById("verificationEmail").textContent = email;
}

async function continueToTrial(user) {
  console.log("Verified user:", user);

  const signupData = JSON.parse(
    sessionStorage.getItem("guild_signup") || "null",
  );

  const username =
    signupData?.userName || user.user_metadata?.displayName || "Adventurer";

  const jobClass =
    signupData?.jobClass || user.user_metadata?.job_class || "web";

  const skills = signupData?.skills || user.user_metadata?.skills || "";

  // Keep the registration data available to the quiz.
  sessionStorage.setItem(
    "guild_user",
    JSON.stringify({
      id: user.id,
      email: user.email,
      username,
      jobClass,
      skills,
    }),
  );

  // Hide registration / verification screens.
  document.getElementById("step1FormContainer").classList.add("hidden");

  document.getElementById("verificationContainer").classList.add("hidden");

  // Show loading screen.
  document.getElementById("loadingContainer").classList.remove("hidden");

  // Give the UI a moment to show the transition.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  document.getElementById("loadingContainer").classList.add("hidden");

  document.getElementById("quizContainer").classList.remove("hidden");

  // Display the user's class.
  document.getElementById("trialClassBadge").textContent = jobClass;

  // Start your existing quiz generation function.
  console.log("job class: ", jobClass);
  setupQuiz(jobClass);
}

async function downloadCard() {
  const card = document.getElementById("rankCard");

  const canvas = await html2canvas(card, {
    scale: 3,
    backgroundColor: "#090516",
    useCORS: true,
  });

  const link = document.createElement("a");

  link.download = `developer-id.png`;

  link.href = canvas.toDataURL("image/png");

  document.body.appendChild(link);
  link.click();
  link.remove();
}

const targetDate = new Date("January 18, 2027 00:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  if (distance <= 0) {
    clearInterval(countdown);
    document.getElementById("countdown").textContent = "Countdown finished!";
  }
}, 1000);
